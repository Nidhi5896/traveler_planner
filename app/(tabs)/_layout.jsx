import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};
export default function Tablayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.BLACK
    }}>
      
        <Tabs.Screen name="mytrip"
        options={{//use to change the label of the app
          tabBarLabel:'My Trip',
          tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color={color} />
        }}/>
        <Tabs.Screen name="discover"  
        options={{//use to change the label of the app
          tabBarLabel:'Discover',
          tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color={color}/>}}/>
        <Tabs.Screen name="profile" options={{//use to change the label of the app
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color}/>}}/>
    </Tabs>
  )
}