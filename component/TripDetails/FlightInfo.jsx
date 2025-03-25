// import { View, Text, TouchableOpacity } from 'react-native'
// import React from 'react'

// export default function FlightInfo({flightData}) {
//   return (
//     <View style={{
//         marginTop:20,
//         padding:10,
//         borderRadius:15,
//         borderwidth:1,
//         borderColor:Colors.gray
//     }}>
//         <View style={{
//             display:'flex',
//             flexDirection:'row',
//             justifyContent:'space-between',
//             alignContent:'center'

//         }}>
//         <Text style={{
//         fontFamily:'outfit-bold',
//         fontSize:20
//       }}>✈️Flights</Text>
//         <TouchableOpacity style={{
//         backgroundColor:Colors.PRIMARY,
//         padding:5,
//         width:100,
//         borderRadius:7,
//         marginTop:7
//       }}>
//         <Text style={{
//             textalign:'center',
//             color:Colors.WHITE,
           
//         }}>Book here</Text>
//         </TouchableOpacity>
//         </View>
      
//       <Text style={{
//         fontSize:17,
//         marginTop:7
//       }}>Airline:Delta</Text>
//       <Text style={{
//         fontSize:17
//       }}>Price: {flightdata.price}</Text>
     
//     </View>
//   );
// }
// import { View, Text, TouchableOpacity } from 'react-native';
// import React from 'react';

// // ✅ Ensure Colors is defined
// const Colors = {
//   PRIMARY: '#007AFF',  // Example primary color (change as needed)
//   WHITE: '#FFFFFF',
//   GRAY: '#A9A9A9',
// };

// export default function FlightInfo({ flightData }) {
//   if (!flightData) {
//     return (
//       <View style={{ padding: 10 }}>
//         <Text>No flight details available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View
//       style={{
//         marginTop: 20,
//         padding: 10,
//         borderRadius: 15,
//         borderWidth: 1, // ✅ Fixed camelCase issue
//         borderColor: Colors.GRAY,
//       }}
//     >
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center', // ✅ Fixed alignContent → alignItems
//         }}
//       >
//         <Text
//           style={{
//             fontFamily: 'outfit-bold',
//             fontSize: 20,
//           }}
//         >
//           ✈️ Flights
//         </Text>
//         <TouchableOpacity
//           style={{
//             backgroundColor: Colors.PRIMARY,
//             padding: 5,
//             width: 100,
//             borderRadius: 7,
//             marginTop: 7,
//             alignItems: 'center', // ✅ Ensures text is centered
//           }}
//         >
//           <Text
//             style={{
//               textAlign: 'center', // ✅ Fixed textalign → textAlign
//               color: Colors.WHITE,
//             }}
//           >
//             Book here
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={{ fontSize: 17, marginTop: 7 }}>Airline: {flightData.airline || 'Unknown'}</Text>
//       <Text style={{ fontSize: 17 }}>Price: {flightData.price ? `$${flightData.price}` : 'N/A'}</Text>
//     </View>
//   );
// }




// working




// import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
// // import { Colors } from './../../constants/Colors';
// const Colors = {
//   black: "#000000",
//   white: "#FFFFFF",
//   gray: "#808080",
//   primary: "#007AFF", // Example primary color (iOS blue)
// };
// const FlightInfo = ({ flightData }) => {
//   if (!flightData || flightData.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>✈️ Flights</Text>
//         <Text style={styles.para}>No flight information available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.flexContainer}>
//         <Text style={styles.title}>✈️ Flights</Text>
//           <TouchableOpacity 
//             style={styles.button} 
//             onPress={() => Linking.openURL(flight.booking_url)}
//           >
//             <Text style={styles.buttonTxT}>Book Here</Text>
//           </TouchableOpacity>
//       </View>
//       {flightData.map((flight, index) => (
//         <View key={index} style={styles.flightContainer}>
//           <Text style={styles.para}>Airline: {flight.airline}</Text>
//           <Text style={styles.para}>Price: {flight.price}</Text>
          
//         </View>
//       ))}
//     </View>
//   );
// };

// export default FlightInfo;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 20,
//     borderColor: Colors.lightGray,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 15,
//   },
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 20,
//   },
//   para: {
//     fontFamily: 'Outfit',
//     fontSize: 17,
//     marginTop: 7,
//   },
//   button: {
//     padding: 5,
//     backgroundColor: Colors.primary,
//     borderRadius: 7,
//     marginTop: 7,
//   },
//   buttonTxT: {
//     fontFamily: 'Outfit',
//     color: Colors.white,
//     textAlign: 'center',
//   },
//   flightContainer: {
//     marginTop: 15,
  
//   },
//   flexContainer:{
//     display:'flex',
//     flexDirection:'row',
//     justifyContent:'space-between'
//   }
// });


import { StyleSheet, Text, View, TouchableOpacity, Linking ,ScrollView } from 'react-native';
// import { ScrollView } from 'react-native-web';

// Define Colors if not imported
const Colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray: "#808080",
  primary: "#007AFF",
  lightGray: "#D3D3D3",
  softSkyBlue: "#E3F2FD",      // Light blue, airy feel
  paleMintGreen: "#E8F5E9",    // Soft green, natural touch
  blushPink: "#FCE4EC",        // Warm pink, inviting
  lavenderMist: "#F3E5F5",      // Subtle lavender tone
  warmPeach: "#FFF3E0",        // Gentle, warm peach
  lightLemonYellow: "#FFFDE7", // Bright and fresh yellow
};

const FlightInfo = ({ flightData }) => {
  if (!flightData || flightData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>✈️ Flights</Text>
        <Text style={styles.para}>No flight information available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>✈️ Flights</Text>

      {flightData.map((flight, index) => (
        <View key={index} style={styles.flightContainer}>
          <View style={styles.flexContainer}>
            <Text style={styles.para}>Airline: {flight.airline}</Text>
            {flight.booking_url ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(flight.booking_url)}
              >
                <Text style={styles.buttonTxT}>Book Here</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.para}>No booking link available</Text>
            )}
          </View>
          <Text style={styles.para}>Price: {flight.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FlightInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: Colors.lightGray,
    borderWidth:6,
    backgroundColor:Colors.blushPink,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
    fontWeight:'bold',
    textDecorationLine: "underline"
  },
  para: {
    fontFamily: "Outfit",
    fontSize: 18,
    backgroundColor:Colors.softSkyBlue,
    marginTop: 7,

  },
  button: {
    padding: 5,
    backgroundColor: Colors.primary,
    borderRadius: 7,
    marginTop: 7,
  },
  buttonTxT: {
    fontFamily: "Outfit",
    color: Colors.white,
    textAlign: "center",
  },
  flightContainer: {
    marginTop: 15,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
