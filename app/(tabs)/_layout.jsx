import { View, Text } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create theme context
export const ThemeContext = createContext();

// Theme colors
const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    tabBar: '#FFFFFF',
    tabBarActive: '#4682B4',
    tabBarInactive: '#999999',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    tabBar: '#1E1E1E',
    tabBarActive: '#4682B4',
    tabBarInactive: '#666666',
  }
};

export default function TabLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on mount
  React.useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'true');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
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
    </ThemeContext.Provider>
  );
}