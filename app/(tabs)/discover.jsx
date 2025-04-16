import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../_layout';

const fetchImage = async (locationName) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e';
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });
    return response.data.hits[0]?.largeImageURL;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    return null;
  }
};

const fetchPOIFromMapTiler = async (bbox, countryName) => {
  const apiKey = 'uCBXEjePDis0WAcvUmjc';
  try {
    const response = await axios.get('https://api.maptiler.com/geocoding/poi.json', {
      params: {
        key: apiKey,
        bbox: bbox,
        limit: 1,
      },
    });
    const feature = response.data.features[0];
    if (feature) {
      return {
        name: feature.properties.name,
        brief: feature.properties.description || 'A popular place to visit.',
        location: `${feature.geometry.coordinates[1]},${feature.geometry.coordinates[0]}`,
        country: countryName,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching POI from MapTiler:", error);
    return null;
  }
};

const fetchPOIsFromContinents = async () => {
  const bboxes = {
    Africa: ['-18.679253,34.559989,51.414942,37.340738', 'Africa'],
    Asia: ['24.396308,54.229087,153.986672,81.137995', 'Asia'],
    Europe: ['-31.464799,34.815924,39.477907,71.185476', 'Europe'],
    NorthAmerica: ['-168.000123,5.499550,-52.233040,83.162102', 'North America'],
    SouthAmerica: ['-93.167592,-56.526054,-28.650543,12.524147', 'South America'],
    Australia: ['112.921114,-54.750690,159.278992,-10.062805', 'Australia'],
    Antarctica: ['-180.000000,-90.000000,180.000000,-60.000000', 'Antarctica']
  };

  const placesPromises = Object.keys(bboxes).map(async (continent) => {
    const place = await fetchPOIFromMapTiler(bboxes[continent][0], bboxes[continent][1]);
    if (place) {
      place.continent = continent;
      const imageUrl = await fetchImage(place.name);
      place.image = imageUrl;
    }
    return place;
  });

  return Promise.all(placesPromises).then(places => places.filter(place => place !== null));
};

const popularPlaces = [
  {
    name: "Taj Mahal",
    country: "India",
    brief: "A stunning white marble mausoleum and one of the Seven Wonders of the World",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg"
  },
  {
    name: "Eiffel Tower",
    country: "France",
    brief: "Iconic iron lattice tower and symbol of Paris",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg"
  },
  {
    name: "Great Wall of China",
    country: "China",
    brief: "Ancient wall stretching thousands of miles across China",
    image: "https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg"
  },
  {
    name: "Pyramids of Giza",
    country: "Egypt",
    brief: "Ancient Egyptian pyramids and the only surviving wonder of the ancient world",
    image: "https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg"
  },
  {
    name: "Sydney Opera House",
    country: "Australia",
    brief: "Famous performing arts center with distinctive shell-like design",
    image: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg"
  },
  {
    name: "Statue of Liberty",
    country: "USA",
    brief: "Iconic symbol of freedom and democracy in New York Harbor",
    image: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg"
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    brief: "Ancient Incan citadel set high in the Andes Mountains",
    image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg"
  },
  {
    name: "Colosseum",
    country: "Italy",
    brief: "Ancient Roman amphitheater and symbol of Imperial Rome",
    image: "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg"
  },
  {
    name: "Petra",
    country: "Jordan",
    brief: "Ancient city carved into rose-colored rock faces",
    image: "https://images.pexels.com/photos/1631665/pexels-photo-1631665.jpeg"
  },
  {
    name: "Christ the Redeemer",
    country: "Brazil",
    brief: "Iconic statue of Jesus Christ overlooking Rio de Janeiro",
    image: "https://images.pexels.com/photos/1804177/pexels-photo-1804177.jpeg"
  },
  {
    name: "Santorini",
    country: "Greece",
    brief: "Beautiful island known for its white-washed buildings and blue domes",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg"
  },
  {
    name: "Mount Fuji",
    country: "Japan",
    brief: "Japan's highest mountain and an iconic symbol of natural beauty",
    image: "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg"
  },
  {
    name: "Northern Lights",
    country: "Iceland",
    brief: "Natural light display in the Earth's sky, predominantly seen in high-latitude regions",
    image: "https://images.pexels.com/photos/1933316/pexels-photo-1933316.jpeg"
  },
  {
    name: "Burj Khalifa",
    country: "UAE",
    brief: "World's tallest building and a marvel of modern architecture",
    image: "https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg"
  },
  {
    name: "Venice Canals",
    country: "Italy",
    brief: "Historic city of canals, gondolas, and beautiful architecture",
    image: "https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg"
  },
  {
    name: "Angkor Wat",
    country: "Cambodia",
    brief: "Largest religious monument in the world and symbol of Cambodia",
    image: "https://images.pexels.com/photos/3669288/pexels-photo-3669288.jpeg"
  },
  {
    name: "Maldives",
    country: "Maldives",
    brief: "Tropical paradise with crystal clear waters and overwater bungalows",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg"
  },
  {
    name: "Grand Canyon",
    country: "USA",
    brief: "Vast natural wonder carved by the Colorado River",
    image: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg"
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    brief: "Majestic mountain range perfect for skiing and scenic views",
    image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg"
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    brief: "Famous for its unique rock formations and hot air balloon rides",
    image: "https://images.pexels.com/photos/2563604/pexels-photo-2563604.jpeg"
  }
];

const Discover = () => {
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedPlace, setSearchedPlace] = useState(null);
  const { isDarkMode, theme } = useContext(ThemeContext);

  useEffect(() => {
    // Initialize with popular places
    setTrendingPlaces(popularPlaces);
    setLoading(false);
  }, []);

  const searchNewPlace = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const newPlace = {
        name: searchQuery,
        country: "Search Result",
        brief: "A place you discovered",
        image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg"
      };
      setSearchedPlace(newPlace);
    } catch (error) {
      console.error("Error searching new place:", error);
    }
  };

  const addNewPlace = () => {
    if (searchedPlace) {
      setTrendingPlaces(prevPlaces => {
        const updatedPlaces = [searchedPlace, ...prevPlaces];
        return updatedPlaces.slice(0, 20); // Keep only the latest 20 places
      });
      setSearchedPlace(null);
      setSearchQuery('');
    }
  };

  const handleCardPress = (name) => {
    const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;
    WebBrowser.openBrowserAsync(wikipediaUrl);
  };

  if (loading) {
    return (
      <View style={[styles.centered, {backgroundColor: theme.background}]}>
        <ActivityIndicator size="large" color={theme.tabBarActive} />
      </View>
    );
  }

  const gradientColors = isDarkMode 
    ? ['#121212', '#1a1a1a', '#232323'] 
    : ['#4c669f', '#3b5998', '#192f6a'];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode && {backgroundColor: 'rgba(255, 255, 255, 0.1)'}]}
          placeholder="Discover a new place"
          placeholderTextColor={isDarkMode ? "#888" : "#A0A0A0"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          color={theme.text}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchNewPlace}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {searchedPlace && (
        <TouchableOpacity style={styles.addButton} onPress={addNewPlace}>
          <Text style={styles.addButtonText}>Add to Trending</Text>
        </TouchableOpacity>
      )}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {trendingPlaces.map((place, index) => (
          <TouchableOpacity
            key={`${place.name}-${index}`}
            style={styles.card}
            onPress={() => handleCardPress(place.name)}
          >
            <Image 
              source={{ uri: place.image }} 
              style={styles.cardImage}
              defaultSource={require('../../assets/images/placeholder.png')}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.cardOverlay}
            >
              <Text style={styles.cardName}>{place.name}</Text>
              <Text style={styles.cardBrief}>{place.brief}</Text>
              <View style={styles.cardFooter}>
                <Ionicons name="location" size={16} color="#fff" />
                <Text style={styles.cardLocation}>{place.country}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 25,
  },
  addButton: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBrief: {
    color: '#eee',
    fontSize: 12,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default Discover;