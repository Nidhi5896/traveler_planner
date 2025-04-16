import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext } from '../_layout';

export default function TabLayout() {
  const { isDarkMode, theme } = useContext(ThemeContext);

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: theme.tabBar,
        borderTopColor: isDarkMode ? '#333333' : '#DDDDDD',
      },
      tabBarActiveTintColor: theme.tabBarActive,
      tabBarInactiveTintColor: theme.tabBarInactive,
    }}>
      <Tabs.Screen 
        name="mytrip"
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({color}) => <Ionicons name="location-sharp" size={24} color={color} />
        }}
      />
      <Tabs.Screen 
        name="discover"
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({color}) => <Ionicons name="globe-sharp" size={24} color={color} />
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Ionicons name="people-circle" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}