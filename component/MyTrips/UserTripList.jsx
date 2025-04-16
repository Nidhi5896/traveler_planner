import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import moment from "moment";
import PropTypes from "prop-types";
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../configs/firebaseconfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { ThemeContext } from '../../app/_layout';

const fetchImage = async (locationName) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });
    return response.data.hits[0].largeImageURL;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    throw error;
  }
};

export default function UserTripList({ userTrips, onTripDeleted }) {
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isDarkMode, theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const urls = {};
      for (const trip of userTrips) {
        try {
          const tripData = JSON.parse(trip.tripData);
          const locationName = tripData.locationInfo.name;
          const url = await fetchImage(locationName);
          urls[trip.docId] = url;
        } catch (error) {
          console.error('Error fetching image for trip:', error);
        }
      }
      setImageUrls(urls);
      setLoading(false);
    };

    if (userTrips && userTrips.length > 0) {
      fetchImages();
    } else {
      setLoading(false);
    }
  }, [userTrips]);

  const handleDeleteTrip = async (tripId) => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'UserTrips', tripId));
              if (onTripDeleted) {
                onTripDeleted(tripId);
              }
              Alert.alert("Success", "Trip deleted successfully");
            } catch (error) {
              console.error("Error deleting trip:", error);
              Alert.alert("Error", "Failed to delete trip. Please try again.");
            }
          }
        }
      ]
    );
  };

  if (!userTrips || userTrips.length === 0) {
    return <Text style={{ color: theme.text }}>No trips available</Text>;
  }

  return (
    <View style={styles.container}>
      {userTrips.map((trip, index) => {
        const tripData = JSON.parse(trip.tripData);
        const imageUrl = imageUrls[trip.docId];

        return (
          <View key={trip.docId || index} style={[
            styles.tripCard, 
            isDarkMode && { backgroundColor: theme.card }
          ]}>
            <TouchableOpacity 
              style={styles.tripContent}
              onPress={() => router.push({ 
                pathname: '/trip-details', 
                params: { trip: JSON.stringify(trip) } 
              })}
            >
              {loading ? (
                <ActivityIndicator size="large" color={theme.tabBarActive} />
              ) : (
                <Image 
                  source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} 
                  style={styles.image} 
                />
              )}
              <View style={styles.infoContainer}>
                <Text style={[styles.location, isDarkMode && { color: theme.text }]}>
                  🌍 {tripData.locationInfo.name}
                </Text>
                <Text style={[styles.dates, isDarkMode && { color: '#aaa' }]}>
                  📅 {moment(trip.startDate).format("MMM Do")} -{" "}
                  {moment(trip.endDate).format("MMM Do, YYYY")}
                </Text>
                <Text style={[styles.travelers, isDarkMode && { color: '#aaa' }]}>
                  🚌 {tripData.traveler.title} - {tripData.traveler.desc}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.deleteButton, isDarkMode && { backgroundColor: 'rgba(50, 50, 50, 0.9)' }]}
              onPress={() => handleDeleteTrip(trip.docId)}
            >
              <Ionicons name="trash-outline" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

UserTripList.propTypes = {
  userTrips: PropTypes.arrayOf(PropTypes.shape({
    docId: PropTypes.string,
    tripData: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })).isRequired,
  onTripDeleted: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  tripCard: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripContent: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  dates: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  travelers: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});