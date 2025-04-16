import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../component/MyTrips/Startnewtrip';
import { auth, db } from './../../configs/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserTripList from './../../component/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import TranslatorButton from '../../component/TranslatorButton';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && GetMyTrips();
  }, [user]);

  const handleAddNewTrip = () => {
    router.push('/create-trip/search-place');
  };

  const handleTripDeleted = (deletedTripId) => {
    setUserTrips(prevTrips => prevTrips.filter(trip => trip.docId !== deletedTripId));
  };
  
  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      setUserTrips(prev => [...prev, { ...doc.data(), docId: doc.id }]);
    });

    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView 
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          padding: 25,
          paddingTop: 55,
          paddingBottom: 100, // Add extra padding at the bottom
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
          }}>My Trips</Text>
          <TouchableOpacity onPress={handleAddNewTrip}>
            <Ionicons name="add-circle-outline" size={50} color="black" />
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size={'large'} color={'#000'} />}
        {userTrips?.length === 0 ?
          <StartNewTripCard />
          : <UserTripList userTrips={userTrips} onTripDeleted={handleTripDeleted} />
        }
      </ScrollView>
      
      {/* Translator Button */}
      <TranslatorButton />
    </View>
  );
}
