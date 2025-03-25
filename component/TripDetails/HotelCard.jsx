// import { View, Text, Image } from 'react-native'
// // import React from 'react'
// import React, { useState, useEffect } from 'react';
// import {GetPhotoRef} from '../../services/GooglePlaceApi';
// import Constants from 'expo-constants';

// export default function HotelCard({item}) {
//   const[photoRef,setPhotoRef]=useState();
//     useEffect(()=>{
//         GetGooglePhotoRef();
//       },[])
    
//     const GetGooglePhotoRef=async()=>{
//           const result=await GetPhotoRef({item,hotelName});
//           // console.log(result?.results[0]?.photos[0]?.photo_reference);
//           setPhotoRef(result);
//       }
  
  
//   return (
//  <View
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
//             width:180,
//         height:120,
//         // objectFit:'cover',
//         borderRadius:15
//           }}/>
//          */}
     


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
//   )
// }

// // // export default HotelCard;

// // // import { View, Text, Image } from 'react-native';
// // // import React, { useState, useEffect } from 'react';

// // // export default function HotelCard({ item }) {
// // //   const [photoRef, setPhotoRef] = useState();

// // //   useEffect(() => {
// // //     GetPhotoRef();
// // //   }, []);

// // //   const GetPhotoRef = async () => {
// // //     const result = await GetPhotoRef({ item, hotelName: item.hotelName }); // Fixed function call
// // //     setPhotoRef(result);
// // //   };

// // //   return (
// // //     <View
// // //       style={{
// // //         marginRight: 20,
// // //         width: 180,
// // //         borderWidth: 1,
// // //         borderRadius: 15,
// // //         padding: 8,
// // //         backgroundColor: '#fff',
// // //       }}
// // //     >
// // //       <Image
// // //         source={{
// // //           uri:
// // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // //             photoRef +
// // //             '&key=' +
// // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // //         }}
// // //         style={{
// // //           width: '100%',
// // //           height: 240,
// // //           objectFit: 'cover',
// // //           borderRadius: 15,
// // //         }}
// // //       />
// // //       <View style={{ marginTop: 5 }}>
// // //         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
// // //           {item.hotelName}
// // //         </Text>
// // //         <View
// // //           style={{
// // //             flexDirection: 'row',
// // //             justifyContent: 'space-between',
// // //             marginTop: 5,
// // //           }}
// // //         >
// // //           <Text>⭐ {item.rating}</Text>
// // //           <Text>💰 {item.price}</Text>
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // }


// // // import { View, Text, Image } from 'react-native';
// // // import React, { useState, useEffect } from 'react';

// // // export default function HotelCard({ item }) {
// // //   const [photoRef, setPhotoRef] = useState(null);

// // //   useEffect(() => {
// // //     GetPhotoRef();
// // //   }, []);

// // //   const GetPhotoRef = async () => {
// // //     try {
// // //       const result = await GetPhotoRef(item); // Ensure GetPhotoRef function is correctly implemented
// // //       setPhotoRef(result?.results?.[0]?.photos?.[0]?.photo_reference || null);
// // //     } catch (error) {
// // //       console.error("Error fetching photo reference:", error);
// // //     }
// // //   };

// // //   return (
// // //     <View
// // //       style={{
// // //         marginRight: 20,
// // //         width: 180,
// // //         borderWidth: 1,
// // //         borderRadius: 15,
// // //         padding: 8,
// // //         backgroundColor: '#fff',
// // //       }}
// // //     >
// // //       {photoRef ? (
// // //         <Image
// // //           source={{
// // //             uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
// // //           }}
// // //           style={{
// // //             width: '100%',
// // //             height: 240,
// // //             borderRadius: 15,
// // //           }}
// // //         />
// // //       ) : (
// // //         <Text>Loading image...</Text>
// // //       )}

// // //       <View style={{ marginTop: 5 }}>
// // //         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.hotelName}</Text>
// // //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
// // //           <Text>⭐ {item.rating}</Text>
// // //           <Text>💰 {item.price}</Text>
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // }

// // // import { View, Text, Image } from 'react-native';
// // // import React, { useState, useEffect } from 'react';

// // // export default function HotelCard({ item }) {
// // //   const [photoRef, setPhotoRef] = useState();

// // //   useEffect(() => {
// // //     GetPhotoRef();
// // //   }, []);

// // //   const GetPhotoRef = async () => {
// // //     const result = await GetPhotoRef({ item, hotelName: item.hotelName });
// // //     setPhotoRef(result);
// // //   };

// // //   return (
// // //     <View
// // //       style={{
// // //         marginRight: 20,
// // //         width: 180, // Adjusted to match image width
// // //         borderWidth: 1,
// // //         borderRadius: 15,
// // //         padding: 8, // Add padding for better spacing
// // //         backgroundColor: '#fff', // Optional background color
// // //       }}
// // //     >
// // //       <Image
// // //         source={{
// // //           uri:
// // //             'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
// // //             photoRef +
// // //             '&key=' +
// // //             process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
// // //         }}
// // //         style={{
// // //           width: '100%',
// // //           height: 240,
// // //           objectFit: 'cover',
// // //           borderRadius: 15,
// // //         }}
// // //       />
// // //       <View style={{ marginTop: 5 }}>
// // //         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.hotelName}</Text>
// // //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
// // //           <Text>⭐ {item.rating}</Text>
// // //           <Text>💰 {item.price}</Text>
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // }
// // // import { View, Text, Image } from 'react-native';
// // // import React, { useState, useEffect } from 'react';

// // // export default function HotelCard({ item }) {
// // //   const [photoRef, setPhotoRef] = useState(null);

// // //   useEffect(() => {
// // //     GetPhotoRef();
// // //   }, []);

// // //   const GetPhotoRef = async () => {
// // //     const result = await GetPhotoRef(item); // Ensure this function is correctly defined elsewhere
// // //     setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
// // //   };

// // //   return (
// // //     <View
// // //       style={{
// // //         marginRight: 20,
// // //         width: 180, // Adjusted to match image width
// // //         borderWidth: 1,
// // //         borderRadius: 15,
// // //         padding: 8, // Add padding for better spacing
// // //         backgroundColor: '#fff', // Optional background color
// // //       }}
// // //     >
// // //       <Image
// // //         source={{
// // //           uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
// // //         }}
// // //         style={{
// // //           width: '100%',
// // //           height: 240,
// // //           borderRadius: 15,
// // //           resizeMode: 'cover', // Use resizeMode instead of objectFit (not supported in React Native)
// // //         }}
// // //       />
// // //       <View style={{ marginTop: 5 }}>
// // //         <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.hotelName}</Text>
// // //         <View
// // //           style={{
// // //             flexDirection: 'row',
// // //             justifyContent: 'space-between',
// // //             marginTop: 5,
// // //           }}
// // //         >
// // //           <Text>⭐ {item.rating}</Text>
// // //           <Text>💰 {item.price}</Text>
// // //         </View>
// // //       </View>
// // //     </View>
// // //   );
// // // }
