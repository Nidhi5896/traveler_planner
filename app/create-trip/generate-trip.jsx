import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/option';
import { chatSession } from '../../configs/AiModal';
import { useRouter } from 'expo-router';
import {auth, db} from './../../configs/firebaseconfig'
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

export default function GenerateTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("We are working to generate your dream trip");
    const router = useRouter();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            fetchWishlistAndGenerateTrip();
        } else {
            GenerateAiTrip([]);
        }
    }, []);

    const fetchWishlistAndGenerateTrip = async () => {
        setLoading(true);
        setMessage("Fetching your travel preferences...");
        try {
            const q = query(collection(db, 'Wishlist'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);
            
            const wishlistItems = [];
            querySnapshot.forEach((doc) => {
                wishlistItems.push(doc.data().item);
            });
            
            GenerateAiTrip(wishlistItems);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            // If there's an error fetching wishlist, proceed without it
            GenerateAiTrip([]);
        }
    };

    const GenerateAiTrip = async (wishlistItems) => {
        setLoading(true);
        setMessage("Crafting your personalized itinerary...");
        
        // Convert wishlist array to a string
        const wishlistString = wishlistItems.length > 0 
            ? wishlistItems.join(", ") 
            : "No specific preferences";
        
        const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData?.locationInfo?.name)
            .replace('{totalDays}', tripData.totalNoOfDays)
            .replace('{totalNight}', tripData.totalNoOfDays-1)
            .replace('{traveler}', tripData.traveler?.title)
            .replace('{budget}', tripData.budget)
            .replace('{totalDays}', tripData.totalNoOfDays)
            .replace('{totalNight}', tripData.totalNoOfDays-1)
            .replace('{wishlist}', wishlistString);

        console.log("Final Prompt:", FINAL_PROMPT);
        
        try {
            setMessage("Generating AI recommendations...");
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log(result.response.text());
            
            try {
                const tripResp = JSON.parse(result.response.text());
                
                setMessage("Saving your trip...");
                const docId = (Date.now()).toString();
                await setDoc(doc(db, 'UserTrips', docId), {
                    userEmail: user.email,
                    tripPlan: tripResp, // AI result
                    tripData: JSON.stringify(tripData), // User selected data
                    wishlistItems: wishlistItems, // Save the wishlist items used
                    docId: docId,
                    createdAt: new Date()
                });
                
                router.push('(tabs)/mytrip');
            } catch (parseError) {
                console.error("Error parsing AI response:", parseError);
                setMessage("Error processing AI response. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error generating trip:", error);
            setMessage("Error generating trip. Please try again.");
            setLoading(false);
        }
    };

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: '#fff',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>  
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 30,
                textAlign: 'center'
            }}>Please Wait...</Text>
            
            <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 20,
                marginBottom: 20
            }}>{message}</Text>

            <Image 
                source={require('./../../assets/images/plane.gif')}
                style={{
                    width: "100%",
                    height: 200,
                    resizeMode: 'contain'
                }}
            />
            
            {loading && (
                <ActivityIndicator 
                    size="large" 
                    color="#4682B4" 
                    style={{ marginTop: 20 }}
                />
            )}
            
            <Text style={{
                fontFamily: 'outfit',
                color: '#808080',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 20
            }}>
                Using your wishlist preferences to create your perfect trip
            </Text>
            
            <Text style={{
                fontFamily: 'outfit',
                color: '#808080',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 10
            }}>Do not Go Back</Text>
        </View>
    );
}