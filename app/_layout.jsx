import { Stack } from "expo-router";
import { CreateTripContext } from './../context/CreateTripContext';
import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create theme context
export const ThemeContext = createContext();

// Theme colors
export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    tabBar: '#FFFFFF',
    tabBarActive: '#4682B4',
    tabBarInactive: '#999999',
    card: '#FFFFFF',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    tabBar: '#1E1E1E',
    tabBarActive: '#4682B4',
    tabBarInactive: '#666666',
    card: '#1E1E1E',
  }
};

export default function RootLayout() {
  const [tripData, setTripData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
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

  // Set theme
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: theme.background }
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CreateTripContext.Provider>
    </ThemeContext.Provider>
  );
}
