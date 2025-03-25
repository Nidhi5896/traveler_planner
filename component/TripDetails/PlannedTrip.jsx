/// // // 
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import Fontisto from '@expo/vector-icons/Fontisto';

// // Define Colors (if not already imported)
// const Colors = {
//   gray: '#777',
//   Primary: '#007AFF',
// };

// export default function PlannedTrip({ details }) {
//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text style={{ fontSize: 20 }}>🌄 Plan Details</Text>

//       {Object.entries(details).reverse().map(([days, details]) => (
//         <View key={days}>
//           <Text style={{ fontSize: 20, marginTop: 20 }}>
//             {days.charAt(0).toUpperCase() + days.slice(1)}
//           </Text>

//           {details.plan.map((place, index) => (
//             <View
//               key={index}
//               style={{
//                 borderWidth: 1,
//                 padding: 10,
//                 borderRadius: 15,
//                 borderColor: Colors.gray,
//                 marginTop: 20,
//               }}
//             >
//               <Image
//                 source={require('./../../assets/images/p1.jpg')}
//                 style={{
//                   width: '100%',
//                   height: 120,
//                   borderRadius: 15,
//                 }}
//               />
              
//               <View style={{ marginTop: 5 }}>
//                 <Text style={{ fontSize: 20 }}> {place?.placeName}</Text>
//                 <Text style={{ fontSize: 17, color: Colors.gray }}>
//                   {place.placeDetails}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginTop: 5,
//                   }}
//                 >
//                   <View>
//                     <Text style={{ fontSize: 17 }}>
//                       Ticket Price: {place.ticketPricing}
//                     </Text>
//                     <Text style={{ fontSize: 17, marginTop: 5 }}>
//                       Time to Travel: {place.timeToTravel}
//                     </Text>
//                   </View>

//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: Colors.Primary,
//                       padding: 5,
//                       borderRadius: 7,
//                     }}
//                   >
//                     <Fontisto name="navigate" size={24} color="white" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       ))}
//     </View>
//   /);
//}
// import { View, Text,TouchableOpacity, Image } from 'react-native';
// import React from 'react';
// import Fontisto from '@expo/vector-icons/Fontisto';

// // Define Colors (if not already imported)
// const Colors = {
//   gray: '#777',
//   Primary: '#007AFF',
// };

// export default function PlannedTrip({ details }) {
//   // Ensure details exist and is an object before calling Object.entries()
//   if (!details || typeof details !== 'object' || Object.keys(details).length === 0) {
//     return (
//       <View style={{ marginTop: 20, padding: 10 }}>
//         <Text style={{ fontSize: 20 }}>🌄 Plan Details</Text>
//         <Text style={{ fontSize: 16, color: Colors.gray }}>No plan details available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text style={{ fontSize: 20 }}>🌄 Plan Details</Text>

//       {Object.entries(details).reverse().map(([day, detail]) => (
//         <View key={day}>
//           <Text style={{ fontSize: 20, marginTop: 20 }}>
//             {day.charAt(0).toUpperCase() + day.slice(1)}
//           </Text>

//           {/* Ensure detail.plan is an array before mapping */}
//           {Array.isArray(detail.plan) ? (
//             detail.plan.map((place, index) => (
//               <View
//                 key={index}
//                 style={{
//                   borderWidth: 1,
//                   padding: 10,
//                   borderRadius: 15,
//                   borderColor: Colors.gray,
//                   marginTop: 20,
//                 }}
//               >
//                 <Image
//                   source={require('./../../assets/images/p1.jpg')}
//                   style={{
//                     width: '100%',
//                     height: 120,
//                     borderRadius: 15,
//                   }}
//                 />

//                 <View style={{ marginTop: 5 }}>
//                   <Text style={{ fontSize: 20 }}> {details. places_to_visit}</Text>
//                   <Text style={{ fontSize: 17, color: Colors.gray }}>
//                     {place?.placeDetails || 'No details available'}
//                   </Text>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'space-between',
//                       marginTop: 5,
//                     }}
//                   >
//                     <View>
//                       <Text style={{ fontSize: 17 }}>
//                         Ticket Price: {place?.ticketPricing || 'N/A'}
//                       </Text>
//                       <Text style={{ fontSize: 17, marginTop: 5 }}>
//                         Time to Travel: {place?.timeToTravel || 'N/A'}
//                       </Text>
//                     </View>

//                     <TouchableOpacity
//                       style={{
//                         backgroundColor: Colors.Primary,
//                         padding: 5,
//                         borderRadius: 7,
//                       }}
//                     >
//                       <Fontisto name="navigate" size={24} color="white" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             ))
//           ) : (
//             <Text style={{ fontSize: 16, color: Colors.gray, marginTop: 10 }}>
//               No plan available for this day.
//             </Text>
//           )}
//         </View>
//       ))}
//     </View>
//   );
// }

// // import { StyleSheet, Text, View, FlatList } from 'react-native';
// // // import React from 'react';

// // // Define how each activity should be rendered
// // const renderActivity = ({ item }) => (
// //   <View style={styles.activity}>
// //     <Text style={styles.activityTitle}>{item.activity}</Text>
// //     <Text>Time: {item.time} ({item.time_to_spend})</Text>
// //     <Text>Details: {item.details}</Text>
// //     <Text>Best Time to Visit: {item.best_time_to_visit}</Text>
// //   </View>
// // );

// // const PlannedTrip = ({ details }) => {
// //   console.log("details from plan trip", details);

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>🏕️ Plan Details</Text>
// //       {Object.entries(details).map(([day, activities], index) => (
// //         <View key={index} style={styles.dayContainer}>
// //           <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
// //           <FlatList
// //             data={activities}
// //             renderItem={renderActivity}
// //             keyExtractor={(item, index) => `${day}-${index}`}
// //           />
// //         </View>
// //       ))}
// //     </View>
// //   );
// // };

// // export default PlannedTrip;

// // const styles = StyleSheet.create({
// //   title: {
// //     fontFamily: 'Outfit-Bold',
// //     fontSize: 20,
// //     marginBottom: 10,
// //   },
// //   container: {
// //     marginTop: 20,
// //     paddingHorizontal: 10,
// //   },
// //   dayContainer: {
// //     marginBottom: 20,
// //   },
// //   dayTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 5,
// //   },
// //   activity: {
// //     marginBottom: 10,
// //   },
// //   activityTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });
// // // import { StyleSheet, Text, View, FlatList } from 'react-native';
// // // import React from 'react';

// // // // Function to render each activity inside a day
// // // const renderActivity = ({ item }) => (
// // //   <View style={styles.activity}>
// // //     <Text style={styles.activityTitle}>{item.activity}</Text>
// // //     <Text>Time: {item.time} ({item.time_to_spend})</Text>
// // //     <Text>Details: {item.details}</Text>
// // //     <Text>Best Time to Visit: {item.best_time_to_visit}</Text>
// // //   </View>
// // // );

// // // const PlannedTrip = ({ details }) => {
// // //   console.log("details from PlannedTrip", details);

// // //   return (
// // //     <FlatList
// // //       data={Object.entries(details)}
// // //       keyExtractor={([day], index) => `${day}-${index}`}
// // //       renderItem={({ item }) => {
// // //         const [day, activities] = item;
// // //         return (
// // //           <View style={styles.dayContainer}>
// // //             <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
// // //             <FlatList
// // //               data={activities}
// // //               renderItem={renderActivity}
// // //               keyExtractor={(item, index) => `${day}-${index}`}
// // //               nestedScrollEnabled={true} // ✅ Fixes nested list scrolling issue
// // //             />
// // //           </View>
// // //         );
// // //       }}
// // //     />
// // //   );
// // // };

// // // export default PlannedTrip;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     marginTop: 20,
// // //     paddingHorizontal: 10,
// // //   },
// // //   title: {
// // //     fontFamily: 'Outfit-Bold',
// // //     fontSize: 20,
// // //     marginBottom: 10,
// // //   },
// // //   dayContainer: {
// // //     marginBottom: 20,
// // //   },
// // //   dayTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     marginBottom: 5,
// // //   },
// // //   activity: {
// // //     marginBottom: 10,
// // //     padding: 10,
// // //     borderRadius: 10,
// // //     backgroundColor: '#f7f7f7',
// // //   },
// // //   activityTitle: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // // });
// // import { StyleSheet, Text, View, FlatList } from 'react-native';
// // import React from 'react';

// // // Function to render each activity inside a day
// // const renderActivity = ({ item }) => (
// //   <View style={styles.activity}>
// //     <Text style={styles.activityTitle}>{item.activity}</Text>
// //     <Text>Time: {item.time} ({item.time_to_spend})</Text>
// //     <Text>Details: {item.details}</Text>
// //     <Text>Best Time to Visit: {item.best_time_to_visit}</Text>
// //   </View>
// // );

// // const PlannedTrip = ({ details }) => {
// //   console.log("details from PlannedTrip", details);

// //   return (
// //     <FlatList
// //       data={Object.entries(details)}
// //       keyExtractor={([day], index) => `${day}-${index}`}
// //       renderItem={({ item }) => {
// //         const [day, activities] = item;
// //         return (
// //           <View style={styles.dayContainer}>
// //             <Text style={styles.dayTitle}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
// //             <View style={{ flexGrow: 1 }}>
// //               <FlatList
// //                 data={activities}
// //                 renderItem={renderActivity}
// //                 keyExtractor={(item, index) => `${day}-${index}`}
// //                 scrollEnabled={false} // ✅ Prevents nested FlatList conflicts
// //               />
// //             </View>
// //           </View>
// //         );
// //       }}
// //     />
// //   );
// // };

// // export default PlannedTrip;

// // const styles = StyleSheet.create({
// //   container: {
// //     marginTop: 20,
// //     paddingHorizontal: 10,
// //   },
// //   title: {
// //     fontFamily: 'Outfit-Bold',
// //     fontSize: 20,
// //     marginBottom: 10,
// //   },
// //   dayContainer: {
// //     marginBottom: 20,
// //   },
// //   dayTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 5,
// //   },
// //   activity: {
// //     marginBottom: 10,
// //     padding: 10,
// //     borderRadius: 10,
// //     backgroundColor: '#f7f7f7',
// //   },
// //   activityTitle: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // /});
// import { View, Text,Image, TouchableOpacity } from "react-native";
// import Fontisto from '@expo/vector-icons/Fontisto';
// import React, { useState, useEffect } from 'react';
// import PlaceCard from "./PlaceCard";

// const Colors = {
//   gray: '#777',
//   Primary: '#007AFF',
  
//     lightblue: "#E3F2FD", // Light Blue
//     secondary: "#FF6B81", // Soft Pink
//     accent: "#FFD166", // Vibrant Yellow
//     background: "#F5F7FA", // Light Gray/White
//     textPrimary: "#333333", // Dark Gray
//     textSecondary: "#555555", // Medium Gray
//     cardBackground: "#FFFFFF", // White for card backgrounds
//     shadow: "#000000", // Black for shadow effects

  
// };
// export default function PlannedTrip({ details }) {
//   // const [photoRef, setPhotoRef] = useState();
 
//   //    useEffect(() => {
//   //      GetPhotoRef();
//   //    }, []);
   
//   //    const GetPhotoRef = async () => {
//   //      const result = await GetPhotoRef({ place,placeName });
//   //      setPhotoRef(result);
//   //    };
  
//   return (
//     <View style={{ marginTop: 20 }}>
//       <Text style={{ fontSize: 20 }}>🌄 Plan Details</Text>

//       {Object.entries(details).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([day, details]) => (
//         <View>
//           <Text style={{ fontWeight: "bold" }}>
//             {day.charAt(0).toUpperCase() + day.slice(1)}
//           </Text>

//           {details.places_to_visit.map((place, index) => (
//         //     <View style={{
//         //       borderWidth:1,
//         //       padding:10,
//         //       backgroundColor:Colors.lightblue,
//         //       borderRadius:15,
//         //       borderColor:Colors.Primary,
//         //       marginTop:20
//         //     }}>
//         //          {/* <Image
//         //                     source={require('./../../assets/images/p1.jpg')}
//         //                     style={{
//         //                       width: 180,
//         //                       height: 120,
//         //                       borderRadius: 15,
//         //                     }}
//         //                   /> */}
//         //                    <Image
//         //         source={{
//         //           uri:
//         //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
//         //             photoRef +
//         //             '&key=' +
//         //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
//         //         }}
//         //         style={{
//         //           width: '100%',
//         //           height: 240,
//         //           objectFit: 'cover',
//         //           borderRadius: 15,
//         //         }}
//         //       />
//         //                   <View style={{
//         //                     marginTop:10
//         //                   }}>
//         //       <Text style={{
//         //         fontSize:20,
//         //         fontWeight:"bold"
//         //       }}>{place?.place_name}</Text>
//         //       <Text style={{
//         //         fontSize:17,
//         //         color:Colors.gray
//         //       }}>{place.place_details}</Text>
//         //       <View style={{
//         //          display:'flex',
//         //          flexDirection:'row',
//         //          alignItems:'center',
//         //          justifyContent:'space-between'
//         //       }}>
//         //         <View>
//         //       <Text style={{
//         //         fontSize:17,marginTop:5
//         //       }}>🎟️ Ticket Price :<Text style={{fontWeight:'bold'}}>{place?.ticket_pricing}</Text></Text>
//         //       <Text style={{
//         //         fontSize:17,marginTop:5
//         //       }}>🕰️ Time to travel :<Text style={{
//         //           fontWeight:"bold"
//         //       }}>{place?.time_to_travel}</Text></Text>
//         //       </View>
//         //       <TouchableOpacity
//         //             style={{
//         //               backgroundColor: Colors.Primary,
//         //               padding: 5,
//         //               borderRadius: 7,
//         //             }}
//         //           >
//         //             <Fontisto name="navigate" size={24} color="white" />
//         //           </TouchableOpacity>
//         //       </View>
//         //       </View>
//         //     </View>
//         //   ))}
//         // </View>
//         <PlaceCard place={place}/>
//       ))}
//       </View>
//       ))}
//     </View>
//   );
// }







































// import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const fetchActivityImage = async (activity) => {
//   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//   try {
//     // Find the index of "visit the " in the activity string
//     const visitIndex = activity.toLowerCase().indexOf("visit the ");
//     let searchQuery;

//     if (visitIndex !== -1) {
//       // If "visit the " is found, take the text after it
//       const afterVisit = activity.slice(visitIndex + 10);
//       // Find the index of "(" if it exists
//       const parenthesisIndex = afterVisit.indexOf("(");
//       if (parenthesisIndex !== -1) {
//         // If "(" is found, take the text before it
//         searchQuery = afterVisit.slice(0, parenthesisIndex).trim();
//       } else {
//         // If no "(", take up to 20 characters
//         searchQuery = afterVisit.slice(0, 20).trim();
//       }
//     } else {
//       // If "visit the " is not found, take the first 20 characters of the activity
//       const parenthesisIndex = activity.indexOf("(");
//       if (parenthesisIndex !== -1 && parenthesisIndex < 20) {
//         searchQuery = activity.slice(0, parenthesisIndex).trim();
//       } else {
//         searchQuery = activity.slice(0, 20).trim();
//       }
//     }

//     // Ensure the search query is not empty
//     if (!searchQuery) {
//       searchQuery = "travel"; // fallback search term
//     }

//     console.log("Search query:", searchQuery); // Log the search query for debugging

//     const response = await axios.get("https://pixabay.com/api/", {
//       params: {
//         key: apiKey,
//         q: searchQuery,
//         image_type: 'photo',
//         per_page: 3,
//       },
//     });
//     if (response.data.hits.length > 0) {
//       return response.data.hits[0].largeImageURL;
//     } else {
//       console.log("No images found for activity:", searchQuery);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching image from Pixabay:", error.response ? error.response.data : error.message);
//     return 'https://imgs.search.brave.com/9Jw4U9sNR-VAYxYlGWRuH-ArazbAyCpSgQ5ndG8sZ64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93cml0/aW5nZXhlcmNpc2Vz/LmNvLnVrL2ltYWdl/cy9tb2JpbGUvd2F0/ZXJmYWxsLWJveS5q/cGc'; // Replace with an actual default image URL
//   }
// };
// const PlanTrip = ({ details }) => {
//   if (!details) {
//     return null;
//   }

//   const sortedDays = Object.keys(details).sort((a, b) => {
//     const dayA = parseInt(a.replace('day', ''));
//     const dayB = parseInt(b.replace('day', ''));
//     return dayA - dayB;
//   });

//   const [images, setImages] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       const newImages = {};
//       for (const dayKey of sortedDays) {
//         const dayDetails = details[dayKey];
//         const activity = Array.isArray(dayDetails.activity) ? dayDetails.activity[0] : dayDetails.activity;
//         const imageUrl = await fetchActivityImage(activity);
//         newImages[dayKey] = imageUrl;
//       }
//       setImages(newImages);
//       setLoading(false);
//     };
//     fetchImages();
//   }, [details]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {sortedDays.map((dayKey) => {
//         const dayDetails = details[dayKey];
//         const activities = Array.isArray(dayDetails.activity) ? dayDetails.activity : [dayDetails.activity];
//         const times = Array.isArray(dayDetails.time) ? dayDetails.time : [dayDetails.time];

//         return (
//           <View key={dayKey} style={styles.dayContainer}>
//             <Text style={styles.dayTitle}>{dayKey.toUpperCase()}</Text>
//             {images[dayKey] ? (
//               <Image source={{ uri: images[dayKey] }} style={styles.activityImage} />
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text style={styles.imagePlaceholderText}>Image not available</Text>
//               </View>
//             )}
//             {activities.map((activity, index) => (
//               <View key={index} style={styles.activityContainer}>
//                 <Text style={styles.timeText}>{times[index]}</Text>
//                 <Text style={styles.activityText}>{activity}</Text>

//               </View>
              
//             ))}
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   dayContainer: {
//     marginBottom: 20,
//     backgroundColor: '#f8f9fa',
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   dayTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#007AFF',
//   },
//   activityContainer: {
//     marginTop: 10,
//   },
//   timeText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   activityText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activityImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imagePlaceholderText: {
//     color: '#555',
//     fontSize: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PlanTrip;

// // import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const fetchActivityImage = async (activity) => {
// //   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
// //   try {
// //     const visitIndex = activity.toLowerCase().indexOf("visit the ");
// //     let searchQuery;

// //     if (visitIndex !== -1) {
// //       const afterVisit = activity.slice(visitIndex + 10);
// //       const parenthesisIndex = afterVisit.indexOf("(");
// //       searchQuery = parenthesisIndex !== -1 ? afterVisit.slice(0, parenthesisIndex).trim() : afterVisit.slice(0, 20).trim();
// //     } else {
// //       const parenthesisIndex = activity.indexOf("(");
// //       searchQuery = parenthesisIndex !== -1 && parenthesisIndex < 20 ? activity.slice(0, parenthesisIndex).trim() : activity.slice(0, 20).trim();
// //     }

// //     if (!searchQuery) searchQuery = "travel"; // Fallback search term
// //     console.log("Search query:", searchQuery);

// //     const response = await axios.get("https://pixabay.com/api/", {
// //       params: {
// //         key: apiKey,
// //         q: searchQuery,
// //         image_type: 'photo',
// //         per_page: 3,
// //       },
// //     });

// //     return response.data.hits.length > 0 ? response.data.hits[0].largeImageURL : null;
// //   } catch (error) {
// //     console.error("Error fetching image from Pixabay:", error.response ? error.response.data : error.message);
// //     return 'https://example.com/default-image.jpg'; // Replace with an actual default image URL
// //   }
// // };

// // const PlanTrip = ({ details }) => {
// //   if (!details) return null;

// //   const sortedDays = Object.keys(details).sort((a, b) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')));

// //   const [images, setImages] = useState({});
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchImages = async () => {
// //       setLoading(true);
// //       const newImages = {};
// //       for (const dayKey of sortedDays) {
// //         const dayDetails = details[dayKey];
// //         const activity = Array.isArray(dayDetails.activity) ? dayDetails.activity[0] : dayDetails.activity;
// //         newImages[dayKey] = await fetchActivityImage(activity);
// //       }
// //       setImages(newImages);
// //       setLoading(false);
// //     };
// //     fetchImages();
// //   }, [details]);

// //   if (loading) {
// //     return (
// //       <View style={styles.centered}>
// //         <ActivityIndicator size="large" color="#007AFF" />
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {sortedDays.map((dayKey) => {
// //         const dayDetails = details[dayKey];
// //         const activities = Array.isArray(dayDetails.activity) ? dayDetails.activity : [dayDetails.activity];
// //         const times = Array.isArray(dayDetails.time) ? dayDetails.time : [dayDetails.time];

// //         return (
// //           <View key={dayKey} style={styles.dayContainer}>
// //             <Text style={styles.dayTitle}>{dayKey.toUpperCase()}</Text>
            
// //             {images[dayKey] ? (
// //               <Image source={{ uri: images[dayKey] }} style={styles.activityImage} />
// //             ) : (
// //               <View style={styles.imagePlaceholder}>
// //                 <Text style={styles.imagePlaceholderText}>Image not available</Text>
// //               </View>
// //             )}

// //             {activities.map((activity, index) => (
// //               <View key={index} style={styles.activityContainer}>
// //                 <Text style={styles.timeText}>{times[index]}</Text>
// //                 <Text style={styles.activityText}>{activity}</Text>
// //               </View>
// //             ))}

// {dayDetails.places_to_visit && dayDetails.places_to_visit.length > 0 && (
//   <View style={styles.placesContainer}>
//     {dayDetails.places_to_visit.map((place, index) => (
//       <View key={index} style={styles.placeCard}>
//         <Image source={{ uri: place.place_image_url }} style={styles.placeImage} />
//         <Text style={styles.placeName}>{place.place_name}</Text>
//         <Text style={styles.placeDetails}>{place.place_details}</Text>
//         <Text style={styles.infoText}>
//           <Text style={styles.boldText}>Travel Time: </Text>{place.time_to_travel}
//         </Text>
//         <Text style={styles.infoText}>
//           <Text style={styles.boldText}>Ticket Price: </Text>{place.ticket_pricing}
//         </Text>
//       </View>
//     ))}

// //           </View>
// //         );
// //       })}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 15,
// //     backgroundColor: '#eef7ff', // Light blue background for better aesthetics
// //     flex: 1,
// //   },
// //   dayContainer: {
// //     marginBottom: 20,
// //     backgroundColor: '#ffffff',
// //     borderRadius: 12,
// //     padding: 15,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 3.5,
// //     elevation: 5,
// //   },
// //   dayTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //     color: '#007AFF',
// //     textAlign: 'center',
// //   },
// //   activityContainer: {
// //     marginTop: 10,
// //     paddingHorizontal: 5,
// //   },
// //   timeText: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 5,
// //   },
// //   activityText: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   activityImage: {
// //     width: '100%',
// //     height: 200,
// //     borderRadius: 10,
// //     marginBottom: 10,
// //   },
// //   imagePlaceholder: {
// //     width: '100%',
// //     height: 200,
// //     borderRadius: 10,
// //     marginBottom: 10,
// //     backgroundColor: '#d3d3d3',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   imagePlaceholderText: {
// //     color: '#555',
// //     fontSize: 16,
// //   },
// //   additionalInfo: {
// //     marginTop: 15,
// //     backgroundColor: '#f1f1f1',
// //     padding: 10,
// //     borderRadius: 8,
// //   },
// //   infoText: {
// //     fontSize: 16,
// //     marginVertical: 3,
// //     color: '#444',
// //   },
// //   boldText: {
// //     fontWeight: 'bold',
// //     color: '#000',
// //   },
// //   centered: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });

// // export default PlanTrip;
// import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const fetchActivityImage = async (activity) => {
//   const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
//   try {
//     let searchQuery = activity.split(" ")[0] || "travel"; // Extracting the first word as a basic query
//     console.log("Search query:", searchQuery);

//     const response = await axios.get("https://pixabay.com/api/", {
//       params: {
//         key: apiKey,
//         q: searchQuery,
//         image_type: 'photo',
//         per_page: 1,
//       },
//     });

//     return response.data.hits.length > 0 ? response.data.hits[0].largeImageURL : null;
//   } catch (error) {
//     console.error("Error fetching image from Pixabay:", error.message);
//     return 'https://example.com/default-image.jpg'; // Default image URL
//   }
// };

// const PlanTrip = ({ details }) => {
//   if (!details) return null;

//   const sortedDays = Object.keys(details).sort((a, b) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')));

//   const [images, setImages] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       const newImages = {};
//       for (const dayKey of sortedDays) {
//         const dayDetails = details[dayKey];
//         const activity = Array.isArray(dayDetails.activity) ? dayDetails.activity[0] : dayDetails.activity;
//         newImages[dayKey] = await fetchActivityImage(activity);
//       }
//       setImages(newImages);
//       setLoading(false);
//     };
//     fetchImages();
//   }, [details]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {sortedDays.map((dayKey) => {
//         const dayDetails = details[dayKey];
//         const activities = Array.isArray(dayDetails.activity) ? dayDetails.activity : [dayDetails.activity];
//         const times = Array.isArray(dayDetails.time) ? dayDetails.time : [dayDetails.time];

//         return (
//           <View key={dayKey} style={styles.dayContainer}>
//             <Text style={styles.dayTitle}>{dayKey.toUpperCase()}</Text>
            
//             {images[dayKey] ? (
//               <Image source={{ uri: images[dayKey] }} style={styles.activityImage} />
//             ) : (
//               <View style={styles.imagePlaceholder}>
//                 <Text style={styles.imagePlaceholderText}>Image not available</Text>
//               </View>
//             )}

//             {activities.map((activity, index) => (
//               <View key={index} style={styles.activityContainer}>
//                 <Text style={styles.timeText}>{times[index]}</Text>
//                 <Text style={styles.activityText}>{activity}</Text>
//               </View>
//             ))}

//             {/* Display places_to_visit details */}
//             {dayDetails.places_to_visit && dayDetails.places_to_visit.length > 0 && (
//               <View style={styles.placesContainer}>
//                 {dayDetails.places_to_visit.map((place, index) => (
//                   <View key={index} style={styles.placeCard}>
//                     <Image source={{ uri: place.place_image_url }} style={styles.placeImage} />
//                     <Text style={styles.placeName}>{place.place_name}</Text>
//                     <Text style={styles.placeDetails}>{place.place_details}</Text>
//                     <Text style={styles.infoText}>
//                       <Text style={styles.boldText}>Travel Time: </Text>{place.time_to_travel}
//                     </Text>
//                     <Text style={styles.infoText}>
//                       <Text style={styles.boldText}>Ticket Price: </Text>{place.ticket_pricing}
//                     </Text>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//     backgroundColor: '#eef7ff',
//     flex: 1,
//   },
//   dayContainer: {
//     marginBottom: 20,
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
//   dayTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#007AFF',
//     textAlign: 'center',
//   },
//   activityContainer: {
//     marginTop: 10,
//     paddingHorizontal: 5,
//   },
//   timeText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   activityText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   activityImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   imagePlaceholder: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imagePlaceholderText: {
//     color: '#555',
//     fontSize: 16,
//   },
//   placesContainer: {
//     marginTop: 15,
//   },
//   placeCard: {
//     backgroundColor: '#f9f9f9',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   placeImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 10,
//     marginBottom: 5,
//   },
//   placeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   placeDetails: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 5,
//   },
//   infoText: {
//     fontSize: 14,
//     marginVertical: 3,
//     color: '#444',
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PlanTrip;
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Colors = {
  softSkyBlue: "#E3F2FD",      // Light blue, airy feel
  paleMintGreen: "#E8F5E9",    // Soft green, natural touch
  blushPink: "#FCE4EC",        // Warm pink, inviting
  lavenderMist: "#F3E5F5",      // Subtle lavender tone
  warmPeach: "#FFF3E0",        // Gentle, warm peach
  lightLemonYellow: "#FFFDE7", // Bright and fresh yellow
};

const fetchActivityImage = async (activity) => {
  const apiKey = '44938756-d9d562ffdaf712150c470c59e'; // Pixabay API key
  try {
    // Find the index of "visit the " in the activity string
    const visitIndex = activity.toLowerCase().indexOf("visit the ");
    let searchQuery;

    if (visitIndex !== -1) {
      // If "visit the " is found, take the text after it
      const afterVisit = activity.slice(visitIndex + 10);
      // Find the index of "(" if it exists
      const parenthesisIndex = afterVisit.indexOf("(");
      if (parenthesisIndex !== -1) {
        // If "(" is found, take the text before it
        searchQuery = afterVisit.slice(0, parenthesisIndex).trim();
      } else {
        // If no "(", take up to 20 characters
        searchQuery = afterVisit.slice(0, 20).trim();
      }
    } else {
      // If "visit the " is not found, take the first 20 characters of the activity
      const parenthesisIndex = activity.indexOf("(");
      if (parenthesisIndex !== -1 && parenthesisIndex < 20) {
        searchQuery = activity.slice(0, parenthesisIndex).trim();
      } else {
        searchQuery = activity.slice(0, 20).trim();
      }
    }

    // Ensure the search query is not empty
    if (!searchQuery) {
      searchQuery = "travel"; // fallback search term
    }

    console.log("Search query:", searchQuery); // Log the search query for debugging

    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: searchQuery,
        image_type: 'photo',
        per_page: 3,
      },
    });
    if (response.data.hits.length > 0) {
      return response.data.hits[0].largeImageURL;
    } else {
      console.log("No images found for activity:", searchQuery);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error.response ? error.response.data : error.message);
    return 'https://imgs.search.brave.com/9Jw4U9sNR-VAYxYlGWRuH-ArazbAyCpSgQ5ndG8sZ64/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93cml0/aW5nZXhlcmNpc2Vz/LmNvLnVrL2ltYWdl/cy9tb2JpbGUvd2F0/ZXJmYWxsLWJveS5q/cGc'; // Replace with an actual default image URL
  }
};
const PlanTrip = ({ details }) => {
  if (!details) {
    return null;
  }

  const sortedDays = Object.keys(details).sort((a, b) => {
    const dayA = parseInt(a.replace('day', ''));
    const dayB = parseInt(b.replace('day', ''));
    return dayA - dayB;
  });

  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const newImages = {};
      for (const dayKey of sortedDays) {
        const dayDetails = details[dayKey];
        const activity = Array.isArray(dayDetails.activity) ? dayDetails.activity[0] : dayDetails.activity;
        const imageUrl = await fetchActivityImage(activity);
        newImages[dayKey] = imageUrl;
      }
      setImages(newImages);
      setLoading(false);
    };
    fetchImages();
  }, [details]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sortedDays.map((dayKey) => {
        const dayDetails = details[dayKey];
        const activities = Array.isArray(dayDetails.activity) ? dayDetails.activity : [dayDetails.activity];
        const times = Array.isArray(dayDetails.time) ? dayDetails.time : [dayDetails.time];

        return (
          <View key={dayKey} style={styles.dayContainer}>
            <Text style={styles.dayTitle}>{dayKey.toUpperCase()}</Text>
            {images[dayKey] ? (
              <Image source={{ uri: images[dayKey] }} style={styles.activityImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>Image not available</Text>
              </View>
            )}
            {activities.map((activity, index) => (
              <View key={index} style={styles.activityContainer}>
                <Text style={styles.timeText}>{times[index]}</Text>
                <Text style={styles.activityText}>{activity}</Text>
              </View>
            ))}
            
             {/* Display places_to_visit details */}
        {dayDetails.places_to_visit && dayDetails.places_to_visit.length > 0 && (
          
              <View style={{backgroundColor:Colors.softSkyBlue}}>
                {dayDetails.places_to_visit.map((place, index) => (
                  
                  <View key={index} style={styles.placeCard}>
                    <Image source={{ uri: place.place_image_url }} style={styles.placeImage} />
                    <Text style={{
                      fontSize: 20,        // Large text
                      fontWeight: "bold",  // Bold style
                      color: "#333",
                      textDecorationLine: "underline", 
                    }}>Trip Dscription</Text>
                    <Text style={{   fontSize: 18,
    fontWeight: "600",   // Medium-bold weight
    color: "#555",  }}>{place.place_name}</Text>
                    <Text style={{fontSize: 15,
    color: "#555"}}>{place.place_details}</Text>
                    <Text >
                      <Text style={{fontSize:15,fontWeight:'bold'}}>🕰️Travel Time: </Text>{place.time_to_travel}
                    </Text>
                    <Text style={styles.infoText}>
                      <Text style={{fontSize:15,fontWeight:'bold'}}>🎟️ Ticket Price: </Text>{place.ticket_pricing}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor:Colors.lightLemonYellow,
  },
  dayContainer: {
    marginBottom: 20,
    
    backgroundColor:Colors.blushPink,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
   
    marginBottom: 10,
    color: '#007AFF',
  },
  activityContainer: {
    marginTop: 10,
    fontSize:15,
    backgroundColor:Colors.paleMintGreen,
  },
  timeText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#555',
    marginBottom: 5,
  },
  activityText: {
    fontSize: 16,
    color: '#333',
  },
  activityImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth:5,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#555',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlanTrip;
