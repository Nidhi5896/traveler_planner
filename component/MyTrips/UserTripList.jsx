import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import moment from "moment";
import PropTypes from "prop-types";

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

export default function UserTripList({ userTrips }) {
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (!userTrips || userTrips.length === 0) {
    return <Text>No trips available</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {userTrips.map((trip, index) => {
          const tripData = JSON.parse(trip.tripData);
          const imageUrl = imageUrls[trip.docId];

          return (
            <TouchableOpacity 
              key={trip.docId || index}
              style={styles.tripCard}
              onPress={() => router.push({ 
                pathname: '/trip-details', 
                params: { trip: JSON.stringify(trip) } 
              })}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
              ) : (
                <Image 
                  source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/p1.jpg')} 
                  style={styles.image} 
                />
              )}
              <View style={styles.infoContainer}>
                <Text style={styles.location}>
                  🌍 {tripData.locationInfo.name}
                </Text>
                <Text style={styles.dates}>
                  📅 {moment(trip.startDate).format("MMM Do")} -{" "}
                  {moment(trip.endDate).format("MMM Do, YYYY")}
                </Text>
                <Text style={styles.travelers}>
                  🚌 {tripData.traveler.title} - {tripData.traveler.desc}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

UserTripList.propTypes = {
  userTrips: PropTypes.arrayOf(PropTypes.shape({
    docId: PropTypes.string,
    tripData: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })).isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f0f0",
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
  }
});