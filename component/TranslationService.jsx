import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Linking, Text, TextInput, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const TranslationService = ({ darkMode = false }) => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [isReady, setIsReady] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [activeLanguageGroup, setActiveLanguageGroup] = useState('indian');

  useEffect(() => {
    // Check if speech is available
    const checkSpeechAvailability = async () => {
      try {
        // Try to use isAvailableAsync if available
        if (Speech.isAvailableAsync) {
          const available = await Speech.isAvailableAsync();
          setSpeechSupported(available);
        } else if (Speech.speak) {
          // Fallback to checking if speak function exists
          setSpeechSupported(true);
        } else {
          setSpeechSupported(false);
        }
      } catch (error) {
        console.error('Error checking speech availability:', error);
        setSpeechSupported(false);
      }
      setIsReady(true);
    };
    
    checkSpeechAvailability();
    
    // Set initial text
    setText("Hello! How can I help you translate this?");
    
    return () => {
      // Cleanup speech when component unmounts
      try {
        if (Speech.stop) {
          Speech.stop();
        }
      } catch (error) {
        console.error('Error stopping speech:', error);
      }
    };
  }, []);

  const openGoogleTranslate = useCallback((text) => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter text to translate");
      return;
    }
    
    const googleTranslateUrl = `https://translate.google.com/?sl=en&tl=${targetLanguage}&text=${encodeURIComponent(text)}&op=translate`;
    console.log('Opening Google Translate URL:', googleTranslateUrl);
    
    Linking.canOpenURL(googleTranslateUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleTranslateUrl);
      } else {
        Alert.alert("Error", "Cannot open Google Translate");
      }
    }).catch(err => {
      console.error('Error opening URL:', err);
      Alert.alert("Error", "Couldn't open Google Translate");
    });
  }, [targetLanguage]);

  const handleLanguageChange = useCallback((language) => {
    setTargetLanguage(language);
    console.log('Language changed to:', language);
  }, []);

  const speakText = useCallback(async () => {
    try {
      if (!speechSupported) {
        Alert.alert("Error", "Speech functionality is not available on your device");
        return;
      }
      
      if (text.trim()) {
        console.log('Speaking text:', text);
        
        try {
          // Check if already speaking
          if (Speech.isSpeakingAsync && await Speech.isSpeakingAsync()) {
            if (Speech.stop) await Speech.stop();
          }
        } catch (e) {
          console.log('Error checking speech status:', e);
        }
        
        // Basic speech options that work on most platforms
        Speech.speak(text, {
          language: 'en-US',
          pitch: 1.0,
          rate: 0.9
        });
      } else {
        Alert.alert("Error", "Please enter text to speak");
      }
    } catch (error) {
      console.error("Speech error:", error);
      Alert.alert("Error", "Failed to use speech function");
    }
  }, [text, speechSupported]);

  // Language groups
  const languageGroups = {
    indian: [
      { label: "Hindi", value: "hi" },
      { label: "Bengali", value: "bn" },
      { label: "Tamil", value: "ta" },
      { label: "Telugu", value: "te" },
      { label: "Marathi", value: "mr" },
      { label: "Gujarati", value: "gu" },
      { label: "Punjabi", value: "pa" },
      { label: "Malayalam", value: "ml" },
      { label: "Kannada", value: "kn" },
      { label: "Odia", value: "or" }
    ],
    european: [
      { label: "French", value: "fr" },
      { label: "German", value: "de" },
      { label: "Spanish", value: "es" },
      { label: "Italian", value: "it" },
      { label: "Portuguese", value: "pt" },
      { label: "Russian", value: "ru" },
      { label: "Dutch", value: "nl" },
      { label: "Swedish", value: "sv" },
      { label: "Greek", value: "el" },
      { label: "Polish", value: "pl" }
    ],
    asian: [
      { label: "Chinese", value: "zh-CN" },
      { label: "Japanese", value: "ja" },
      { label: "Korean", value: "ko" },
      { label: "Thai", value: "th" },
      { label: "Vietnamese", value: "vi" },
      { label: "Indonesian", value: "id" },
      { label: "Malay", value: "ms" }
    ],
    other: [
      { label: "Arabic", value: "ar" },
      { label: "Turkish", value: "tr" },
      { label: "Hebrew", value: "he" }
    ]
  };

  if (!isReady) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading translator...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.headerContainer}>
        <Ionicons name="language-outline" size={24} color={darkMode ? "#fff" : "#4682B4"} />
        <Text style={[styles.title, darkMode ? styles.darkText : styles.lightText]}>
          Travel Translator
        </Text>
      </View>
      
      <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Enter Text:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, darkMode ? styles.darkInput : styles.lightInput]}
          value={text}
          onChangeText={setText}
          placeholder="Enter text to translate"
          placeholderTextColor={darkMode ? '#ccc' : '#555'}
          multiline
        />
        {speechSupported && (
          <TouchableOpacity 
            style={styles.speakButton}
            onPress={speakText}
            activeOpacity={0.7}
          >
            <Ionicons name="volume-high" size={22} color="#4682B4" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.label, darkMode ? styles.darkText : styles.lightText]}>Select Language:</Text>
      
      {/* Language Group Tabs */}
      <View style={styles.langGroupTabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.groupTab, activeLanguageGroup === 'indian' && styles.activeGroupTab]}
            onPress={() => setActiveLanguageGroup('indian')}
          >
            <Text style={[styles.groupTabText, activeLanguageGroup === 'indian' && styles.activeGroupTabText]}>
              Indian
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.groupTab, activeLanguageGroup === 'european' && styles.activeGroupTab]}
            onPress={() => setActiveLanguageGroup('european')}
          >
            <Text style={[styles.groupTabText, activeLanguageGroup === 'european' && styles.activeGroupTabText]}>
              European
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.groupTab, activeLanguageGroup === 'asian' && styles.activeGroupTab]}
            onPress={() => setActiveLanguageGroup('asian')}
          >
            <Text style={[styles.groupTabText, activeLanguageGroup === 'asian' && styles.activeGroupTabText]}>
              Asian
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.groupTab, activeLanguageGroup === 'other' && styles.activeGroupTab]}
            onPress={() => setActiveLanguageGroup('other')}
          >
            <Text style={[styles.groupTabText, activeLanguageGroup === 'other' && styles.activeGroupTabText]}>
              Other
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* Language Buttons */}
      <View style={styles.languageButtonsContainer}>
        {languageGroups[activeLanguageGroup].map((lang, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.languageButton, 
              targetLanguage === lang.value && styles.selectedLanguage
            ]}
            onPress={() => handleLanguageChange(lang.value)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.languageText,
              targetLanguage === lang.value && styles.selectedLanguageText
            ]}>
              {lang.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.translateButton}
        onPress={() => openGoogleTranslate(text)}
        activeOpacity={0.7}
      >
        <Ionicons name="language" size={20} color="white" />
        <Text style={styles.translateButtonText}>Translate with Google</Text>
      </TouchableOpacity>
      
      <Text style={styles.footerText}>
        Translations are powered by Google Translate
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    minHeight: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  lightContainer: { 
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  darkContainer: { 
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    textAlign: 'center',
  },
  lightText: { color: '#333' },
  darkText: { color: '#fff' },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    paddingRight: 40, // Space for the speak button
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#ccc',
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
    borderColor: '#666',
  },
  speakButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
  },
  langGroupTabs: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  groupTab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeGroupTab: {
    backgroundColor: '#4682B4',
  },
  groupTabText: {
    fontSize: 14,
    color: '#666',
  },
  activeGroupTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  languageButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    marginHorizontal: 4,
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#4682B4',
  },
  languageText: {
    fontSize: 12,
    color: '#333',
  },
  selectedLanguageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  translateButton: {
    backgroundColor: '#4682B4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  translateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default TranslationService; 