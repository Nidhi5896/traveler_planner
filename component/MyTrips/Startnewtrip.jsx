import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '../../app/_layout';

export default function Startnewtrip() {
  const router = useRouter();
  const { isDarkMode, theme } = useContext(ThemeContext);
  
  return (
    <View style={{
      padding: 20,
      marginTop: 50,
      display: 'flex',
      alignItems: 'center',
      gap: 20 // use to give gap between the component
    }}>
      <Ionicons name="location-sharp" size={30} color={theme.text} />
      <Text style={{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        color: theme.text
      }}>No trips planned yet</Text>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: isDarkMode ? '#aaa' : '#808080',
        marginTop: 10
      }}>Look like it's time to plan a new travel experience! Get started below</Text>
      
      {/* button */}
      <TouchableOpacity 
        onPress={() => router.push('/create-trip/search-place')} 
        style={{
          padding: 15,
          backgroundColor: theme.tabBarActive,
          borderRadius: 15,
          paddingHorizontal: 30
        }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 17
        }}>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}