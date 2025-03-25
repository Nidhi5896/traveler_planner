// import { View, Text, FlatList, Image } from 'react-native';
// import {useState,React,useEffect} from 'react';

// export default function HotelList({ hotelList }) {
//   const[photoRef,setPhotoRef]=useState();
//       useEffect(()=>{
//           GetGooglePhotoRef();
//         },[])
//         const GetPhotoRef=async()=>{
//           const result=await GetPhotoRef({item,hotelName});
//           // console.log(result?.results[0]?.photos[0]?.photo_reference);
//           setPhotoRef(result);
//       }
//         const GetGooglePhotoRef=async()=>{
//           const result=await GetPhotoRef('Las,ua');
//           console.log(result?.results[0].photos);
//         }
      
   
//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text style={{ fontSize: 20 }}>🏨 Hotel recommendation</Text>
      
//       <FlatList
//         data={hotelList}
//         style={{ marginTop: 8 }}
//         showsHorizontalScrollIndicator={false}
//         horizontal={true}
//         keyExtractor={(item, index) => index.toString()} // Ensure unique keys
//         renderItem={({ item,index }) => (
//           <View
//             style={{
//               marginRight: 20,
//               width: 180, // Adjusted to fit content
//               borderWidth: 1,
//               borderRadius: 15,
//               padding: 8,
//               backgroundColor: '#fff',
//             }}
//           >
//             {/* <Image
//               source={require('./../../assets/images/p1.jpg')}
//               style={{
//                 width: 180,
//                 height: 120,
//                 borderRadius: 15,
//               }}
//             /> */}
//                <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
//           style={{
//             width:'100%',
//         height:240,
//         objectFit:'cover',
//         borderRadius:15
//           }}/>
//             <View>
//               <Text style={{ fontSize: 17 }}>{item.hotelName}</Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   marginTop: 5,
//                 }}
//               >
//                 <Text>⭐ {item.rating}</Text>
//                 <Text>💰 {item.price}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

// const HotelList = ({ hotelList }) => {
//   const [photoRef, setPhotoRef] = useState(null);

//   useEffect(() => {
//     if (hotelList.length > 0) {
//       GetPhotoRef(hotelList[0]); // Fetch photo for the first hotel as an example
//     }
//   }, [hotelList]);

//   const GetPhotoRef = async (item) => {
//     if (!item) return; // Ensure item is defined
//     try {
//       const result = await GetPhotoRef({ item, hotelName: item.name });
//       setPhotoRef(result);
//     } catch (error) {
//       console.error('Error fetching photo reference:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏨 Hotel Recommendation</Text>
//       <FlatList
//         style={styles.hotelItem}
//         data={hotelList}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={{ marginRight: 20, width: 180 }}>
//             {photoRef && (
//               <Image
//                 source={{
//                   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
//                 }}
//                 style={styles.image}
//               />
//             )}
//             <View>
//               <Text style={styles.hotelName}>{item.name}</Text>
//               <View style={styles.flexContainer}>
//                 <Text style={{ fontFamily: 'Outfit' }}>🌟 {item.rating}</Text>
//                 <Text style={{ fontFamily: 'Outfit' }}>💰 {item.price}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default HotelList;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//   },
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   hotelItem: {
//     marginTop: 8,
//   },
//   hotelName: {
//     fontFamily: 'Outfit-Medium',
//     fontSize: 17,
//   },
//   image: {
//     width: 180,
//     height: 120,
//     borderRadius: 15,
//   },
//   flexContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     gap: 5,
//   },
// });



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

// const HotelList = ({ hotelList }) => {
//   // const [photoRef, setPhotoRef] = useState(null);

//   // useEffect(() => {
//   //   if (hotelList.length > 0) {
//   //     fetchPhotoRef(hotelList[0]); // Fetch photo for the first hotel
//   //   }
//   // }, [hotelList]);

//   // // ✅ Corrected function to fetch photo reference
//   // const fetchPhotoRef = async (item) => {
//   //   if (!item || !item.place_id) return; // Ensure item has a valid place_id

//   //   try {
//   //     const response = await fetch(
//   //       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&fields=photos&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
//   //     );
//   //     const data = await response.json();

//   //     if (data.result?.photos?.length > 0) {
//   //       setPhotoRef(data.result.photos[0].photo_reference);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching photo reference:', error);
//   //   }
//   // };
//   const[photoRef,setPhotoRef]=useState();
//   const  GetGooglePhotoRef=async()=>{
//     const result=await GetPhotoRef('Las Vegas,usa');
//     console.log(result)
//   }
//   useEffect(()=>{
//       GetGooglePhotoRef();
//     },[])
  
//   const GetPhotoRef=async()=>{
//         const result=await GetPhotoRef({item,hotelName});
//         // console.log(result?.results[0]?.photos[0]?.photo_reference);
//         setPhotoRef(result);
//     }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏨 Hotel Recommendation</Text>
//       <FlatList
//         style={styles.hotelItem}
//         data={hotelList}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={{ marginRight: 20, width: 180 }}>
//             {photoRef && (
//               <Image
//                 source={{
//                   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
//                 }}
//                 style={styles.image}
//               />
//             )}
//             <View>
//               <Text style={styles.hotelName}>{item.name}</Text>
//               <View style={styles.flexContainer}>
//                 <Text style={{ fontFamily: 'Outfit' }}>🌟 {item.rating}</Text>
//                 <Text style={{ fontFamily: 'Outfit' }}>💰 {item.price}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default HotelList;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//   },
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   hotelItem: {
//     marginTop: 8,
//   },
//   hotelName: {
//     fontFamily: 'Outfit-Medium',
//     fontSize: 17,
//   },
//   image: {
//     width: 180,
//     height: 120,
//     borderRadius: 15,
//   },
//   flexContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     gap: 5,
//   },
// });wooeking
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';

// const HotelList = ({ hotelList }) => {
//   const [photoRefs, setPhotoRefs] = useState({});

//   useEffect(() => {
//     fetchAllPhotoRefs();
//   }, [hotelList]);

//   const fetchAllPhotoRefs = async () => {
//     const updatedPhotoRefs = {};

//     for (const hotel of hotelList) {
//       if (hotel.place_id) {
//         try {
//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/place/details/json?place_id=${hotel.place_id}&fields=photos&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
//           );
//           const data = await response.json();

//           if (data.result?.photos?.length > 0) {
//             updatedPhotoRefs[hotel.place_id] = data.result.photos[0].photo_reference;
//           }
//         } catch (error) {
//           console.error('Error fetching photo reference:', error);
//         }
//       }
//     }
//     setPhotoRefs(updatedPhotoRefs);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <Text style={styles.title}>🏨 Hotel Recommendation</Text>
      
//       <FlatList
//         data={hotelList}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.place_id || item.name} 
//         renderItem={({ item }) => (
//           <View style={styles.hotelCard}>
//             {/* {photoRefs[item.place_id] ? (
//               <Image
//                 source={{
//                   uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[item.place_id]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
//                 }}
//                 style={styles.image}
//               />
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text style={{ color: '#888' }}>No Image</Text>
//               </View>
//             )} */}
//                <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
//                       style={{
//                         width:'100%',
//                     height:240,
//                     objectFit:'cover',
//                     borderRadius:15
//                       }}/>
                 

//             <View style={styles.details}>
//               <Text style={styles.hotelName}>{item.name}</Text>
//               <View style={styles.flexContainer}>
//                 <Text>🌟 {item.rating}</Text>
//                 <Text>💰 {item.price}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// };

// export default HotelList;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     paddingHorizontal: 15,
//   },
//   hotelCard: {
//     marginRight: 20,
//     width: 180,
//     borderWidth: 1,
//     borderRadius: 15,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     borderRadius: 10,
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: 120,
//     borderRadius: 10,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   details: {
//     marginTop: 5,
//   },
//   hotelName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   flexContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
// });

























// import { View, Text, FlatList, Image } from 'react-native';
// // import {useState,useEffect} from 'react';
// import React, { useState, useEffect } from 'react';

// import HotelCard from './HotelCard';

// export default function HotelList({ hotelList }) {
//   // const[photoRef,setPhotoRef]=useState();
//   //     useEffect(()=>{
//   //         GetGooglePhotoRef();
//   //       },[])
//   //       const GetPhotoRef=async()=>{
//   //         const result=await GetPhotoRef({item,hotelName});
//   //         console.log(result?.results[0]?.photos[0]?.photo_reference);
//   //         setPhotoRef(result);
//   //     }
//   //       const GetGooglePhotoRef=async()=>{
//   //         const result=await GetPhotoRef('Las,ua');
//   //         console.log(result?.results[0].photos);
//   //       }
      
   
//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text style={{ fontSize: 20 }}>🏨 Hotel recommendation</Text>
      
//       <FlatList
//         data={hotelList}
//         style={{ marginTop: 8 }}
//         showsHorizontalScrollIndicator={false}
//         horizontal={true}
//         keyExtractor={(item, index) => index.toString()} // Ensure unique keys
//         renderItem={({item,index}) => (
//           <View
//             style={{
//               marginRight: 20,
              
//               width: 200, // Adjusted to fit content
//               borderWidth: 1,
//               borderRadius: 15,
//               padding: 8,
//               backgroundColor: '#fff',
//             }}
//           >
//             <Image
//               source={require('./../../assets/images/p1.jpg')}
//               style={{
//                 width: 180,
//                 height: 120,
//                 borderRadius: 15,
//               }}
//             />
//                {/* <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
//           style={{
//             width:'100%',
//         height:240,
//         objectFit:'cover',
//         borderRadius:15
//           }}/> */}
//             <View>
//               <Text style={{ fontSize:17,flex:1 }}>{item.hotel_name}</Text>
//               <View
//                 style={{
//                   display:'flex',
//                   justifyContent:'space-between',
//                   flexDirection: 'row',
                 
//                   marginTop: 5,
//                 }}
//               >
                
//                 <Text>⭐{item.rating}</Text>
//                 <Text>     💰{item.price}</Text>
//               </View>
//             </View>
//           </View>
//         // <HotelCard item={item}/>
//         )}
//       />
//     </View>
//   );
// }
























//working code end



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const HotelList = ({ hotelList }) => {
//   const [hotelImages, setHotelImages] = useState({});

//   useEffect(() => {
//     // Fetch images for each hotel in hotelList
//     const fetchHotelImages = async () => {
//       const images = {};
//       for (const hotel of hotelList) {
//         const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
//         images[hotel.hotel_name] = imageUrl;
//       }
//       setHotelImages(images);
//     };

//     fetchHotelImages();
//   }, [hotelList]);

//   const fetchImageFromPixabay = async (searchTerm) => {
//     const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//     const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       if (data.hits && data.hits.length > 0) {
//         return data.hits[0].webformatURL; // Adjust as per Pixabay API response structure
//       } else {
//         throw new Error('No images found');
//       }
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       return null;
//     }
//   };

//   if (!hotelList || hotelList.length === 0) {
//     return (
//       <View style={styles.noHotelsContainer}>
//         <Text style={styles.noHotelsText}>No hotel details available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       horizontal
//       style={styles.container}
//       showsHorizontalScrollIndicator={false}
//     >
//       {hotelList.map((hotel, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.hotelCard}
//           onPress={() => handlePressHotel(hotel)}
//         >
//           <Image
//             source={{
//               uri:
//                 hotelImages[hotel.hotel_name] ||
//                 'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
//             }}
//             style={styles.hotelImage}
//           />
//           <View style={styles.hotelDetails}>
//             <Text style={styles.hotelName} numberOfLines={3}>
//               {hotel.hotel_name}
//             </Text>
//             <Text style={styles.hotelAddress} numberOfLines={2}>
//               {hotel.hotel_address}
//             </Text>
//             <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
//             <Text style={styles.hotelRating}>{hotel.rating} ⭐ </Text>
//             <TouchableOpacity
//               style={styles.bookButton}
//               onPress={() => handleBookHotel(hotel.booking_url)}
//             >
//               <Text style={styles.bookButtonText}>Book Now</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const handlePressHotel = (hotel) => {
//   // Handle press action for hotel card, e.g., navigate to hotel details screen
//   console.log('Pressed hotel:', hotel);
// };

// const handleBookHotel = (bookingUrl) => {
//   // Handle booking logic, e.g., open a web browser or navigate to the booking URL
//   console.log('Booking hotel:', bookingUrl);
//   // Example: window.open(bookingUrl, '_blank'); // For web-based applications
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     paddingHorizontal: 16, // Add horizontal padding to avoid content touching edges
//   },
//   hotelCard: {
//     backgroundColor: '#fff',
//     marginRight: 16, // Add margin to separate hotel cards
//     width: windowWidth * 0.7, // Adjust width according to your design needs
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//     flexDirection: 'row',
//     overflow: 'hidden',
//   },
//   hotelImage: {
//     width: 120, // Adjust the width according to your design needs
//     height: '100%', // Maintain aspect ratio
//     resizeMode: 'cover',
//   },
//   hotelDetails: {
//     flex: 1,
//     padding: 16,
//   },
//   hotelName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   hotelAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   hotelDescription: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   hotelPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#007AFF',
//     marginBottom: 8,
//   },
//   hotelRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#d4af37',
//     marginBottom: 8,
//   },
//   bookButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   noHotelsContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   noHotelsText: {
//     fontSize: 16,
//     color: '#555',
//   },
// });

// export default HotelList;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const HotelList = ({ hotelList }) => {
//   const [hotelImages, setHotelImages] = useState({});

//   useEffect(() => {
//     const fetchHotelImages = async () => {
//       const images = {};
//       for (const hotel of hotelList) {
//         const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
//         images[hotel.hotel_name] = imageUrl;
//       }
//       setHotelImages(images);
//     };
//     fetchHotelImages();
//   }, [hotelList]);

//   const fetchImageFromPixabay = async (searchTerm) => {
//     const apiKey = '44938756-d9d562ffdaf712150c470c59e';
//     const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       return data.hits?.[0]?.webformatURL || null;
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       return null;
//     }
//   };

//   const handleBookHotel = (bookingUrl) => {
//     if (bookingUrl) {
//       Linking.openURL(bookingUrl).catch((err) => console.error('Error opening URL:', err));
//     }
//   };

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
//       {hotelList.map((hotel, index) => (
//         <View key={index} style={styles.hotelCard}>
//           <Image
//             source={{ uri: hotelImages[hotel.hotel_name] || 'https://via.placeholder.com/400x300.png?text=No+Image' }}
//             style={styles.hotelImage}
//           />
//           <View style={styles.infoContainer}>
//             <Text style={styles.hotelName}>{hotel.hotel_name}</Text>
//             <Text style={styles.hotelAddress}>{hotel.hotel_address}</Text>
//             <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
//             <Text style={styles.hotelRating}>{hotel.rating} ⭐</Text>
//             <TouchableOpacity style={styles.bookButton} onPress={() => handleBookHotel(hotel.booking_url)}>
//               <Text style={styles.bookButtonText}>Book Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },
//   hotelCard: {
//     width: windowWidth * 0.8,
//     borderRadius: 15,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     marginRight: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   hotelImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'cover',
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   hotelName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   hotelAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 4,
//   },
//   hotelPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   hotelRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFD700',
//     marginVertical: 4,
//   },
//   bookButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   bookButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default HotelList;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const HotelList = ({ hotelList}) => {
//   const [hotelImages, setHotelImages] = useState({});

//   useEffect(() => {
//     const fetchHotelImages = async () => {
//       const images = {};
//       for (const hotel of hotelList) {
//         const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
//         images[hotel.hotel_name] = imageUrl;
//       }
//       setHotelImages(images);
//     };
//     fetchHotelImages();
//   }, [hotelList]);

//   const fetchImageFromPixabay = async (searchTerm) => {
//     const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//     const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       if (data.hits && data.hits.length > 0) {
//         return data.hits[0].webformatURL;
//       } else {
//         throw new Error('No images found');
//       }
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       return null;
//     }
//   };

//   const handleBookHotel = (bookingUrl) => {
//     if (bookingUrl) {
//       Linking.openURL(bookingUrl).catch((err) => console.error('Failed to open URL:', err));
//     } else {
//       alert('Booking URL not available');
//     }
//   };
//   const generateBookingUrl = (hotelName) => {
//     return `https://www.google.com/search?q=${encodeURIComponent(hotelName + " hotel booking")}`;
//   };
  

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
//       {hotelList.map((hotel, index) => (
//         <View key={index} style={styles.hotelCard}>
//           <Image
//             source={{
//               uri:
//                 hotelImages[hotel.hotel_name] ||
//                 'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
//             }}
//             style={styles.hotelImage}
//           />
//           <View style={styles.hotelDetails}>
//             <Text style={styles.hotelName} numberOfLines={2}>{hotel.hotel_name}</Text>
//             <Text style={styles.hotelAddress} numberOfLines={1}>{hotel.hotel_address}</Text>
//             <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
//             <Text style={styles.hotelRating}>{hotel.rating} ⭐ </Text>
//             {/* <TouchableOpacity style={styles.bookButton} onPress={() => handleBookHotel(hotel.booking_url)}>
//               <Text style={styles.bookButtonText}>Book Now</Text>
//             </TouchableOpacity> */}
//             <TouchableOpacity
//   style={styles.bookButton}
//   onPress={() => Linking.openURL(hotel.booking_url || generateBookingUrl(hotel.hotel_name))}
// >
//   <Text style={styles.bookButtonText}>Book Now</Text>
// </TouchableOpacity>

//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     paddingHorizontal: 10,
//   },
//   hotelCard: {
//     backgroundColor: '#fff',
//     marginRight: 10,
//     width: windowWidth * 0.6, // Adjusted smaller width
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 4,
//     overflow: 'hidden',
//   },
//   hotelImage: {
//     width: '100%',
//     height: 120,
//     resizeMode: 'cover',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   hotelDetails: {
//     padding: 10,
//   },
//   hotelName: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   hotelAddress: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
//   hotelPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#007AFF',
//     marginBottom: 4,
//   },
//   hotelRating: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#d4af37',
//     marginBottom: 8,
//   },
//   bookButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default HotelList;

const Colors = {
  softSkyBlue: "#E3F2FD",      // Light blue, airy feel
  paleMintGreen: "#E8F5E9",    // Soft green, natural touch
  blushPink: "#FCE4EC",        // Warm pink, inviting
  lavenderMist: "#F3E5F5",      // Subtle lavender tone
  warmPeach: "#FFF3E0",        // Gentle, warm peach
  lightLemonYellow: "#FFFDE7", // Bright and fresh yellow
};
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const HotelList = ({ hotelList = [] }) => {  // 👈 Default empty array
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    if (!hotelList || hotelList.length === 0) return; // 👈 Prevents running on empty list

    const fetchHotelImages = async () => {
      const images = {};
      for (const hotel of hotelList) {
        const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
        images[hotel.hotel_name] = imageUrl;
      }
      setHotelImages(images);
    };
    fetchHotelImages();
  }, [hotelList]);

  const fetchImageFromPixabay = async (searchTerm) => {
    const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL;
      } else {
        throw new Error('No images found');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleBookHotel = (bookingUrl) => {
    if (bookingUrl) {
      Linking.openURL(bookingUrl).catch((err) => console.error('Failed to open URL:', err));
    } else {
      alert('Booking URL not available');
    }
  };

  const generateBookingUrl = (hotelName) => {
    return `https://www.google.com/search?q=${encodeURIComponent(hotelName + " hotel booking")}`;
  };

  // ✅ Check if `hotelList` has valid data before mapping
  if (!Array.isArray(hotelList) || hotelList.length === 0) {
    return (
      <View style={styles.noHotelsContainer}>
        <Text style={styles.noHotelsText}>No hotels available</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {hotelList.map((hotel, index) => (
        <View key={index} style={styles.hotelCard}>
          <Image
            source={{
              uri:
                hotelImages[hotel.hotel_name] ||
                'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
            }}
            style={styles.hotelImage}
          />
          <View style={styles.hotelDetails}>
            <Text style={styles.hotelName} numberOfLines={2}>{hotel.hotel_name}</Text>
            <Text style={styles.hotelAddress} numberOfLines={1}>{hotel.hotel_address}</Text>
            <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
            <Text style={styles.hotelRating}>{hotel.rating} ⭐ </Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => Linking.openURL(hotel.booking_url || generateBookingUrl(hotel.hotel_name))}
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor:Colors.blushPink
  },
  hotelCard: {
    backgroundColor: Colors.warmPeach,
    marginRight: 10,
    width: windowWidth * 0.6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
   
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  hotelDetails: {
    padding: 10,
  },
  hotelName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hotelAddress: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  hotelPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  hotelRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d4af37',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  noHotelsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noHotelsText: {
    fontSize: 16,
    color: '#555',
  },
});

export default HotelList;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const HotelList = ({ hotelList }) => {
//   const [hotelImages, setHotelImages] = useState({});

//   useEffect(() => {
//     // Fetch images for each hotel in hotelList
//     const fetchHotelImages = async () => {
//       const images = {};
//       for (const hotel of hotelList) {
//         const imageUrl = await fetchImageFromPixabay(hotel.hotel_name);
//         images[hotel.hotel_name] = imageUrl;
//       }
//       setHotelImages(images);
//     };

//     fetchHotelImages();
//   }, [hotelList]);

//   const fetchImageFromPixabay = async (searchTerm) => {
//     const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//     const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       if (data.hits && data.hits.length > 0) {
//         return data.hits[0].webformatURL; // Adjust as per Pixabay API response structure
//       } else {
//         throw new Error('No images found');
//       }
//     } catch (error) {
//       console.error('Error fetching image:', error);
//       return null;
//     }
//   };

//   if (!hotelList || hotelList.length === 0) {
//     return (
//       <View style={styles.noHotelsContainer}>
//         <Text style={styles.noHotelsText}>No hotel details available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       horizontal
//       style={styles.container}
//       showsHorizontalScrollIndicator={false}
//     >
//       {hotelList.map((hotel, index) => (
//         <TouchableOpacity
//           key={index}
//           style={styles.hotelCard}
//           onPress={() => handlePressHotel(hotel)}
//         >
//           <Image
//             source={{
//               uri:
//                 hotelImages[hotel.hotel_name] ||
//                 'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
//             }}
//             style={styles.hotelImage}
//           />
//           <View style={styles.hotelDetails}>
//             <Text style={styles.hotelName} numberOfLines={3}>
//               {hotel.hotel_name}
//             </Text>
//             <Text style={styles.hotelAddress} numberOfLines={2}>
//               {hotel.hotel_address}
//             </Text>
//             <Text style={styles.hotelPrice}>💰 {hotel.price}</Text>
//             <Text style={styles.hotelRating}>{hotel.rating} ⭐ </Text>
//             <TouchableOpacity
//               style={styles.bookButton}
//               onPress={() => handleBookHotel(hotel.booking_url)}
//             >
//               <Text style={styles.bookButtonText}>Book Now</Text>
//             </TouchableOpacity>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const handlePressHotel = (hotel) => {
//   // Handle press action for hotel card, e.g., navigate to hotel details screen
//   console.log('Pressed hotel:', hotel);
// };

// const handleBookHotel = (bookingUrl) => {
//   // Handle booking logic, e.g., open a web browser or navigate to the booking URL
//   console.log('Booking hotel:', bookingUrl);
//   // Example: window.open(bookingUrl, '_blank'); // For web-based applications
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     paddingHorizontal: 16, // Add horizontal padding to avoid content touching edges
//   },
//   hotelCard: {
//     backgroundColor: '#fff',
//     marginRight: 16, // Add margin to separate hotel cards
//     width: windowWidth * 0.7, // Adjust width according to your design needs
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//     flexDirection: 'row',
//     overflow: 'hidden',
//   },
//   hotelImage: {
//     width: 120, // Adjust the width according to your design needs
//     height: '100%', // Maintain aspect ratio
//     resizeMode: 'cover',
//   },
//   hotelDetails: {
//     flex: 1,
//     padding: 16,
//   },
//   hotelName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   hotelAddress: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   hotelDescription: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   hotelPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#007AFF',
//     marginBottom: 8,
//   },
//   hotelRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#d4af37',
//     marginBottom: 8,
//   },
//   bookButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   noHotelsContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   noHotelsText: {
//     fontSize: 16,
//     color: '#555',
//   },
// });

// export default HotelList;