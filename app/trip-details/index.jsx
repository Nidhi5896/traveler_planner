import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import moment from 'moment/moment';
import { Ionicons } from '@expo/vector-icons';
import FlightInfo from '../../component/TripDetails/FlightInfo';
import HotelList from '../../component/TripDetails/HotelList';
import PlannedTrip from '../../component/TripDetails/PlannedTrip';

const fetchImage = async (locationName) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
  try {
    console.log("Fetching image for location:", locationName);
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });
      console.log("Fetched image URL:", response.data.hits[0].largeImageURL);
      return response.data.hits[0].largeImageURL;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    throw error;
  }
};

export default function TripDetails() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistExpanded, setWishlistExpanded] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    console.log("Received params:", JSON.stringify(params, null, 2));

    if (params.trip) {
      try {
        let parsedTrip;
        if (typeof params.trip === 'string') {
          parsedTrip = JSON.parse(params.trip);
        } else {
          parsedTrip = params.trip;
        }
        console.log("Parsed trip:", JSON.stringify(parsedTrip, null, 2));

        setTripDetails(parsedTrip);

        let tripData;
        if (typeof parsedTrip.tripData === 'string') {
          tripData = JSON.parse(parsedTrip.tripData);
        } else {
          tripData = parsedTrip.tripData;
        }
        console.log("Parsed tripData:", JSON.stringify(tripData, null, 2));

        const locationName = tripData?.locationInfo?.name;

        if (locationName) {
          fetchImage(locationName)
            .then(url => {
              setImageUrl(url);
            setLoading(false);
            })
            .catch(error => {
            console.error('Error fetching image:', error);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing trip details:", error);
        setError("Failed to parse trip details");
        setLoading(false);
      }
    } else {
      setError("Trip details are not provided");
      setLoading(false);
    }
  }, [params.trip]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!tripDetails) {
    return (
      <View style={styles.centered}>
        <Text>No trip details available</Text>
      </View>
    );
  }

  let tripData;
  try {
    tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
  } catch (error) {
    console.error("Error parsing tripData:", error);
    return (
      <View style={styles.centered}>
        <Text>Error loading trip data</Text>
      </View>
    );
  }

  const toggleWishlistExpanded = () => {
    setWishlistExpanded(!wishlistExpanded);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.locationText}>
          {tripDetails.tripPlan?.trip_details?.destination}
        </Text>
        <Text style={styles.dates}>
          📅 {moment(tripData.startDate).format("MMM Do")} - {" "}
          {moment(tripData.endDate).format("MMM Do, YYYY")}
        </Text>
        <Text style={styles.travelers}>
          🚌 {tripData.traveler.title} - {tripData.traveler.desc}
        </Text>
        
        {tripDetails.wishlistItems && tripDetails.wishlistItems.length > 0 && (
          <View style={styles.wishlistContainer}>
            <TouchableOpacity 
              style={styles.wishlistHeader} 
              onPress={toggleWishlistExpanded}
            >
              <View style={styles.wishlistHeaderContent}>
                <Ionicons name="heart" size={20} color="#FF6B6B" />
                <Text style={styles.wishlistTitle}>Your Wishlist Preferences</Text>
      </View>
              <Ionicons 
                name={wishlistExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666"
              />
            </TouchableOpacity>
            
            {wishlistExpanded && (
              <View style={styles.wishlistItemsContainer}>
                {tripDetails.wishlistItems.map((item, index) => (
                  <View key={index} style={styles.wishlistItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#4682B4" />
                    <Text style={styles.wishlistItemText}>{item}</Text>
                  </View>
                ))}
                <Text style={styles.wishlistNote}>
                  These preferences were considered when planning your trip
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      <FlightInfo flightData={tripDetails?.tripPlan?.flights?.details} />
        <HotelList hotelList={tripDetails?.tripPlan?.hotels?.options} />
        <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dates: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  travelers: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  wishlistContainer: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  wishlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  wishlistHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistTitle: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  wishlistItemsContainer: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: '#F0F8FF',
  },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  wishlistItemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  wishlistNote: {
    marginTop: 10,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 20,
  },
  // ... other existing styles ...
});
