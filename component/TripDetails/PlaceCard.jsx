// import { View, Text } from 'react-native'
// import React from 'react'
// import {GetPhotoRef} from '../../services/GooglePlaceApi';

// export default function PlaceCard ({place}) {
//  const [photoRef, setPhotoRef] = useState();
 
//    useEffect(() => {
//      GetPhotoRef();
//    }, []);
 
//    const GetPhotoRef = async () => {
//      const result = await GetPhotoRef({ place,place_name });
//      setPhotoRef(result);
//    };
//     return (
//    <View style={{
//                  borderWidth:1,
//                  padding:10,
//                  backgroundColor:Colors.lightblue,
//                  borderRadius:15,
//                  borderColor:Colors.Primary,
//                  marginTop:20
//                }}>
//                     {/* <Image
//                                source={require('./../../assets/images/p1.jpg')}
//                                style={{
//                                  width: 180,
//                                  height: 120,
//                                  borderRadius: 15,
//                                }}
//                              /> */}
//                               <Image
//                    source={{
//                      uri:
//                        'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
//                        photoRef +
//                        '&key=' +
//                        process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
//                    }}
//                    style={{
//                      width: '100%',
//                      height: 240,
//                      objectFit: 'cover',
//                      borderRadius: 15,
//                    }}
//                  />
//                              <View style={{
//                                marginTop:10
//                              }}>
//                  <Text style={{
//                    fontSize:20,
//                    fontWeight:"bold"
//                  }}>{place?.place_name}</Text>
//                  <Text style={{
//                    fontSize:17,
//                    color:Colors.gray
//                  }}>{place.place_details}</Text>
//                  <View style={{
//                     display:'flex',
//                     flexDirection:'row',
//                     alignItems:'center',
//                     justifyContent:'space-between'
//                  }}>
//                    <View>
//                  <Text style={{
//                    fontSize:17,marginTop:5
//                  }}>🎟️ Ticket Price :<Text style={{fontWeight:'bold'}}>{place?.ticket_pricing}</Text></Text>
//                  <Text style={{
//                    fontSize:17,marginTop:5
//                  }}>🕰️ Time to travel :<Text style={{
//                      fontWeight:"bold"
//                  }}>{place?.time_to_travel}</Text></Text>
//                  </View>
//                  <TouchableOpacity
//                        style={{
//                          backgroundColor: Colors.Primary,
//                          padding: 5,
//                          borderRadius: 7,
//                        }}
//                      >
//                        <Fontisto name="navigate" size={24} color="white" />
//                      </TouchableOpacity>
//                  </View>
//                  </View>
//                </View>
            
//   )
// }
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetPhotoRef } from '../../services/GooglePlaceApi';
import { Fontisto } from '@expo/vector-icons';
// import Colors from '../../constants/Colors';
const Colors = {
    gray: '#777',
    Primary: '#007AFF',
    
      lightblue: "#E3F2FD", // Light Blue
      secondary: "#FF6B81", // Soft Pink
      accent: "#FFD166", // Vibrant Yellow
      background: "#F5F7FA", // Light Gray/White
      textPrimary: "#333333", // Dark Gray
      textSecondary: "#555555", // Medium Gray
      cardBackground: "#FFFFFF", // White for card backgrounds
      shadow: "#000000", // Black for shadow effects
  
    
  };
export default function PlaceCard({ place }) {
  const [photoRef, setPhotoRef] = useState(null);

  useEffect(() => {
    fetchPhotoRef();
  }, []);

  const fetchPhotoRef = async () => {
    if (!place) return;
    try {
      const result = await GetPhotoRef({ place });
      setPhotoRef(result);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  return (
    <View style={{
      borderWidth: 1,
      padding: 10,
      backgroundColor: Colors.lightblue,
      borderRadius: 15,
      borderColor: Colors.Primary,
      marginTop: 20
    }}>
      {photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 15,
          }}
        />
      ) : (
        <Text>Loading image...</Text>
      )}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{place?.place_name}</Text>
        <Text style={{ fontSize: 17, color: Colors.gray }}>{place?.place_details}</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View>
            <Text style={{ fontSize: 17, marginTop: 5 }}>
              🎟️ Ticket Price: <Text style={{ fontWeight: 'bold' }}>{place?.ticket_pricing}</Text>
            </Text>
            <Text style={{ fontSize: 17, marginTop: 5 }}>
              🕰️ Time to travel: <Text style={{ fontWeight: 'bold' }}>{place?.time_to_travel}</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Primary,
              padding: 5,
              borderRadius: 7,
            }}
          >
            <Fontisto name="navigate" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
