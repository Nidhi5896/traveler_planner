import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, TextInput, Alert, ScrollView, Modal, ActivityIndicator, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../configs/firebaseconfig'; // Fixed path with lowercase config
import { collection, addDoc, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../_layout';

const Profile = () => {
  const router = useRouter();
  const { isDarkMode, setIsDarkMode, theme } = React.useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [wishlistItem, setWishlistItem] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [fullPageWishlist, setFullPageWishlist] = useState(false);
  const [imageCache, setImageCache] = useState({});
  
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const notificationsSetting = await AsyncStorage.getItem('notifications');
        const language = await AsyncStorage.getItem('language');
        const currency = await AsyncStorage.getItem('currency');
        
        if (notificationsSetting !== null) setNotifications(notificationsSetting === 'true');
        if (language !== null) setSelectedLanguage(language);
        if (currency !== null) setSelectedCurrency(currency);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    
    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = (value) => {
    setIsDarkMode(value);
    // Save to AsyncStorage
    saveSettings('darkMode', value);
  };

  // Handle notifications toggle
  const handleNotificationsToggle = (value) => {
    setNotifications(value);
    saveSettings('notifications', value);
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    saveSettings('language', language);
    setShowLanguageModal(false);
  };

  // Handle currency change
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    saveSettings('currency', currency);
    setShowCurrencyModal(false);
  };

  // Handle password change
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    setChangingPassword(true);
    
    try {
      // In a real app, you would verify the current password and update it
      // For this example, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user document in Firestore
      if (user && user.email) {
        const userRef = doc(db, 'users', user.email);
        await updateDoc(userRef, {
          passwordUpdatedAt: new Date()
        });
      }
      
      Alert.alert('Success', 'Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowSecurityModal(false);
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        fetchWishlist(user.email);
      } else {
        setUser(null);
        setWishlist([]);
      }
    });

    return unsubscribe;
  }, []);

  // Function to fetch images from Pixabay similar to discover.jsx
  const fetchImage = async (locationName) => {
    // Check cache first
    if (imageCache[locationName]) {
      console.log('Using cached image for:', locationName);
      return imageCache[locationName];
    }
    
    const apiKey = '44938756-d9d562ffdaf712150c470c59e';
    try {
      console.log('Fetching image for:', locationName);
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: apiKey,
          q: locationName,
          image_type: 'photo',
        },
      });
      
      const imageUrl = response.data.hits[0]?.largeImageURL || 
                      'https://images.pexels.com/photos/2245432/pexels-photo-2245432.jpeg';
      
      // Cache the result
      setImageCache(prev => ({...prev, [locationName]: imageUrl}));
      
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image from Pixabay:", error);
      return 'https://images.pexels.com/photos/2245432/pexels-photo-2245432.jpeg';
    }
  };

  const fetchWishlist = async (userEmail) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'Wishlist'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        items.push({ 
          id: doc.id, 
          ...data,
          placeName: data.item
        });
      });
      
      setWishlist(items);
      
      // Fetch images for all items
      for (const item of items) {
        const imageUrl = await fetchImage(item.item);
        setWishlist(current => 
          current.map(wishItem => 
            wishItem.id === item.id 
              ? {...wishItem, imageUrl} 
              : wishItem
          )
        );
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      Alert.alert('Error', 'Failed to load your wishlist');
    } finally {
      setLoading(false);
    }
  };

  const addWishlistItem = async () => {
    if (!wishlistItem.trim()) {
      Alert.alert('Input Required', 'Please enter a wishlist item');
      return;
    }
    
    try {
      console.log('Adding wishlist item:', wishlistItem);
      setLoading(true);
      
      // First check if user is authenticated
      if (!user || !user.email) {
        Alert.alert('Authentication Error', 'Please sign in again to add items');
        return;
      }
      
      // Fetch image for the new item
      const imageUrl = await fetchImage(wishlistItem.trim());
      
      const docRef = await addDoc(collection(db, 'Wishlist'), {
        item: wishlistItem.trim(),
        userEmail: user.email,
        createdAt: new Date(),
        imageUrl: imageUrl
      });
      
      console.log('Item added successfully with ID:', docRef.id);
      
      // Update local state
      const newItem = { 
        id: docRef.id, 
        item: wishlistItem.trim(),
        userEmail: user.email,
        imageUrl: imageUrl,
        createdAt: new Date()
      };
      
      setWishlist(current => [...current, newItem]);
      setWishlistItem('');
      setShowInput(false);
      
      // Confirm to user
      Alert.alert('Success', 'Wishlist item added successfully!');
    } catch (error) {
      console.error('Error adding wishlist item:', error);
      Alert.alert('Error', 'Failed to add item to wishlist: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlistItem = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, 'Wishlist', id));
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      Alert.alert('Error', 'Failed to remove item from wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('Attempting to sign out...');
      await auth.signOut();
      console.log('Sign-out successful');
      router.replace('/auth/sign-up'); // Use replace to navigate to sign-up screen
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app developed by Pushkal Vashishtha! [App Link]',
      });
    } catch (error) {
      console.error('Error sharing the app:', error);
    }
  };

  const renderFullPageWishlist = () => {
    return (
      <Modal
        visible={fullPageWishlist}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setFullPageWishlist(false)}
      >
        <View style={styles.fullPageContainer}>
          <View style={styles.fullPageHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setFullPageWishlist(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.fullPageTitle}>My Travel Wishlist</Text>
          </View>
          
          <ScrollView contentContainerStyle={styles.fullPageContent}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4682B4" />
                <Text style={styles.loadingText}>Loading your wishlist...</Text>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.addWishlistButton}
                  onPress={() => setShowInput(!showInput)}
                >
                  <Text style={styles.addWishlistText}>
                    {showInput ? "Cancel" : "Add to Wishlist"}
                  </Text>
                </TouchableOpacity>
    
                {showInput && (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={wishlistItem}
                      onChangeText={setWishlistItem}
                      placeholder="Add a travel wish..."
                      placeholderTextColor="#999"
                    />
                    <TouchableOpacity 
                      style={[styles.addButton, wishlistItem.trim() ? styles.addButtonActive : {}]}
                      onPress={addWishlistItem}
                      disabled={loading || !wishlistItem.trim()}
                    >
                      <Ionicons name="add-circle" size={30} color={wishlistItem.trim() ? "#4682B4" : "#ccc"} />
                    </TouchableOpacity>
                  </View>
                )}
    
                <Text style={styles.wishlistCount}>Your wishlist items: {wishlist.length}</Text>
    
                {wishlist.length > 0 ? (
                  wishlist.map(item => {
                    // For debugging
                    console.log('Rendering item:', item.item);
                    
                    return (
                      <View key={item.id} style={styles.fullPageWishlistItem}>
                        <Image 
                          source={{ uri: item.imageUrl }}
                          style={{width: '100%', height: 180}}
                          resizeMode="cover"
                          onError={() => console.log('Image loading error for:', item.item)}
                        />
                        <View style={styles.wishlistItemContent}>
                          <Text style={styles.wishlistItemText}>{item.item}</Text>
                          <TouchableOpacity 
                            style={styles.removeButton}
                            onPress={() => removeWishlistItem(item.id)}
                          >
                            <Ionicons name="trash-outline" size={24} color="#ff6347" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.emptyWishlist}>
                    <Ionicons name="heart-outline" size={60} color="#ccc" />
                    <Text style={styles.emptyWishlistText}>Your wishlist is empty</Text>
                    <Text style={styles.emptyWishlistSubtext}>Add destinations or activities you would like to experience</Text>
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderSettingsModal = () => {
    return (
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={[styles.settingsContainer, isDarkMode && styles.darkModeContainer]}>
          <View style={styles.settingsHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowSettings(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.settingsTitle}>Settings</Text>
          </View>
          
          <ScrollView style={styles.settingsContent}>
            {/* Theme Settings */}
            <View style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}>
              <View style={styles.settingLeft}>
                <Ionicons name="moon-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#4682B4' : '#f4f3f4'}
              />
            </View>

            {/* Notifications */}
            <View style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}>
              <View style={styles.settingLeft}>
                <Ionicons name="notifications-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notifications ? '#4682B4' : '#f4f3f4'}
              />
            </View>

            {/* Language Selection */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowLanguageModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="language-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Language</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, isDarkMode && styles.darkModeText]}>{selectedLanguage}</Text>
                <Ionicons name="chevron-forward" size={20} color="#4682B4" />
              </View>
            </TouchableOpacity>

            {/* Currency Selection */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowCurrencyModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="cash-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Currency</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={[styles.settingValue, isDarkMode && styles.darkModeText]}>{selectedCurrency}</Text>
                <Ionicons name="chevron-forward" size={20} color="#4682B4" />
              </View>
            </TouchableOpacity>

            {/* Security Settings */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowSecurityModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="shield-checkmark-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Security</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#4682B4" />
            </TouchableOpacity>

            {/* Privacy Settings */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowPrivacyModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="lock-closed-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Privacy</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#4682B4" />
            </TouchableOpacity>

            {/* Help & Support */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowHelpModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="help-circle-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>Help & Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#4682B4" />
            </TouchableOpacity>

            {/* About */}
            <TouchableOpacity 
              style={[styles.settingItem, isDarkMode && styles.darkModeSettingItem]}
              onPress={() => setShowAboutModal(true)}
            >
              <View style={styles.settingLeft}>
                <Ionicons name="information-circle-outline" size={24} color="#4682B4" />
                <Text style={[styles.settingText, isDarkMode && styles.darkModeText]}>About</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#4682B4" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderLanguageModal = () => {
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
    
    return (
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            {languages.map((lang) => (
              <TouchableOpacity 
                key={lang}
                style={[
                  styles.modalOption,
                  selectedLanguage === lang && styles.modalOptionSelected,
                  isDarkMode && styles.darkModeModalOption
                ]}
                onPress={() => handleLanguageChange(lang)}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedLanguage === lang && styles.modalOptionTextSelected,
                  isDarkMode && styles.darkModeText
                ]}>
                  {lang}
                </Text>
                {selectedLanguage === lang && (
                  <Ionicons name="checkmark" size={20} color="#4682B4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  const renderCurrencyModal = () => {
    const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
    
    return (
      <Modal
        visible={showCurrencyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>Select Currency</Text>
              <TouchableOpacity onPress={() => setShowCurrencyModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            {currencies.map((curr) => (
              <TouchableOpacity 
                key={curr}
                style={[
                  styles.modalOption,
                  selectedCurrency === curr && styles.modalOptionSelected,
                  isDarkMode && styles.darkModeModalOption
                ]}
                onPress={() => handleCurrencyChange(curr)}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedCurrency === curr && styles.modalOptionTextSelected,
                  isDarkMode && styles.darkModeText
                ]}>
                  {curr}
                </Text>
                {selectedCurrency === curr && (
                  <Ionicons name="checkmark" size={20} color="#4682B4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  };

  const renderSecurityModal = () => {
    return (
      <Modal
        visible={showSecurityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSecurityModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>Security Settings</Text>
              <TouchableOpacity onPress={() => setShowSecurityModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.securityForm}>
              <Text style={[styles.securityLabel, isDarkMode && styles.darkModeText]}>Current Password</Text>
              <TextInput
                style={[styles.securityInput, isDarkMode && styles.darkModeInput]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter current password"
                placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                secureTextEntry
              />
              
              <Text style={[styles.securityLabel, isDarkMode && styles.darkModeText]}>New Password</Text>
              <TextInput
                style={[styles.securityInput, isDarkMode && styles.darkModeInput]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                secureTextEntry
              />
              
              <Text style={[styles.securityLabel, isDarkMode && styles.darkModeText]}>Confirm New Password</Text>
              <TextInput
                style={[styles.securityInput, isDarkMode && styles.darkModeInput]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor={isDarkMode ? "#aaa" : "#999"}
                secureTextEntry
              />
              
              <TouchableOpacity 
                style={styles.securityButton}
                onPress={handlePasswordChange}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.securityButtonText}>Change Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderPrivacyModal = () => {
    return (
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>Privacy Settings</Text>
              <TouchableOpacity onPress={() => setShowPrivacyModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.privacyContent}>
              <Text style={[styles.privacyText, isDarkMode && styles.darkModeText]}>
                Your privacy is important to us. We collect and process your data in accordance with our Privacy Policy.
              </Text>
              
              <View style={styles.privacySection}>
                <Text style={[styles.privacySectionTitle, isDarkMode && styles.darkModeText]}>
                  Data Collection
                </Text>
                <Text style={[styles.privacySectionText, isDarkMode && styles.darkModeText]}>
                  We collect information that you provide directly to us, including your name, email address, and travel preferences.
                </Text>
              </View>
              
              <View style={styles.privacySection}>
                <Text style={[styles.privacySectionTitle, isDarkMode && styles.darkModeText]}>
                  Data Usage
                </Text>
                <Text style={[styles.privacySectionText, isDarkMode && styles.darkModeText]}>
                  We use your data to provide and improve our services, personalize your experience, and communicate with you.
                </Text>
              </View>
              
              <View style={styles.privacySection}>
                <Text style={[styles.privacySectionTitle, isDarkMode && styles.darkModeText]}>
                  Data Protection
                </Text>
                <Text style={[styles.privacySectionText, isDarkMode && styles.darkModeText]}>
                  We implement appropriate security measures to protect your personal information from unauthorized access.
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.privacyButton}
                onPress={() => setShowPrivacyModal(false)}
              >
                <Text style={styles.privacyButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHelpModal = () => {
    return (
      <Modal
        visible={showHelpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>Help & Support</Text>
              <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.helpContent}>
              <Text style={[styles.helpText, isDarkMode && styles.darkModeText]}>
                Need help with the app? Here are some resources to assist you:
              </Text>
              
              <View style={styles.helpSection}>
                <Text style={[styles.helpSectionTitle, isDarkMode && styles.darkModeText]}>
                  Frequently Asked Questions
                </Text>
                <Text style={[styles.helpSectionText, isDarkMode && styles.darkModeText]}>
                  Find answers to common questions about using the app, managing your account, and more.
                </Text>
              </View>
              
              <View style={styles.helpSection}>
                <Text style={[styles.helpSectionTitle, isDarkMode && styles.darkModeText]}>
                  Contact Support
                </Text>
                <Text style={[styles.helpSectionText, isDarkMode && styles.darkModeText]}>
                  Our support team is available to help you with any issues or questions you may have.
                </Text>
              </View>
              
              <View style={styles.helpSection}>
                <Text style={[styles.helpSectionTitle, isDarkMode && styles.darkModeText]}>
                  Tutorials
                </Text>
                <Text style={[styles.helpSectionText, isDarkMode && styles.darkModeText]}>
                  Learn how to use the app's features with our step-by-step tutorials and guides.
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.helpButton}
                onPress={() => setShowHelpModal(false)}
              >
                <Text style={styles.helpButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAboutModal = () => {
    return (
      <Modal
        visible={showAboutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isDarkMode && styles.darkModeModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, isDarkMode && styles.darkModeText]}>About</Text>
              <TouchableOpacity onPress={() => setShowAboutModal(false)}>
                <Ionicons name="close" size={24} color="#4682B4" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.aboutContent}>
              <Image 
                source={require('../../assets/images/icon.png')} 
                style={styles.aboutLogo} 
              />
              
              <Text style={[styles.aboutAppName, isDarkMode && styles.darkModeText]}>
                Travel App
              </Text>
              
              <Text style={[styles.aboutVersion, isDarkMode && styles.darkModeText]}>
                Version 1.0.0
              </Text>
              
              <Text style={[styles.aboutDescription, isDarkMode && styles.darkModeText]}>
                A comprehensive travel app that helps you discover new places, plan your trips, and manage your travel wishlist.
              </Text>
              
              <View style={styles.aboutSection}>
                <Text style={[styles.aboutSectionTitle, isDarkMode && styles.darkModeText]}>
                  Features
                </Text>
                <Text style={[styles.aboutSectionText, isDarkMode && styles.darkModeText]}>
                  • Discover popular travel destinations{'\n'}
                  • Create and manage your travel wishlist{'\n'}
                  • Plan your trips with detailed itineraries{'\n'}
                  • Share your travel experiences with friends
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.aboutButton}
                onPress={() => setShowAboutModal(false)}
              >
                <Text style={styles.aboutButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      {/* Header with Settings Button */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, isDarkMode && styles.darkModeText]}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsIconButton}
          onPress={() => setShowSettings(true)}
        >
          <Ionicons name="settings-outline" size={24} color={theme.tabBarActive} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {user && (
          <View style={[styles.userIntroContainer, isDarkMode && styles.darkModeCard]}>
            <View style={[styles.profileGradient, {backgroundColor: isDarkMode ? '#1a1a1a' : '#e6f2ff'}]}>
              <View style={styles.profileImageContainer}>
                {user.photoURL ? (
                  <Image source={{ uri: user.photoURL }} style={styles.userImage} />
                ) : (
                  <View style={styles.profileInitialsContainer}>
                    <Text style={styles.profileInitials}>
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.userName, isDarkMode && styles.darkModeText]}>{user.fullName}</Text>
              <Text style={[styles.userEmail, isDarkMode && styles.darkModeText]}>{user.email}</Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, isDarkMode && styles.darkModeText]}>{wishlist.length}</Text>
                  <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>Wishlist</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, isDarkMode && styles.darkModeText]}>0</Text>
                  <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>Trips</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, isDarkMode && styles.darkModeText]}>0</Text>
                  <Text style={[styles.statLabel, isDarkMode && styles.darkModeText]}>Photos</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <View style={[styles.quickActionsContainer, isDarkMode && styles.darkModeCard]}>
          <TouchableOpacity 
            style={[styles.quickActionButton, isDarkMode && styles.darkModeQuickAction]}
            onPress={() => setFullPageWishlist(true)}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: 'rgba(255, 99, 71, 0.2)'}]}>
              <Ionicons name="heart" size={22} color="#ff6347" />
            </View>
            <Text style={[styles.quickActionText, isDarkMode && styles.darkModeText]}>Wishlist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionButton, isDarkMode && styles.darkModeQuickAction]}
            onPress={() => router.push('/create-trip/search-place')}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: 'rgba(70, 130, 180, 0.2)'}]}>
              <Ionicons name="add-circle" size={22} color="#4682B4" />
            </View>
            <Text style={[styles.quickActionText, isDarkMode && styles.darkModeText]}>New Trip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.quickActionButton, isDarkMode && styles.darkModeQuickAction]}
            onPress={handleShare}
          >
            <View style={[styles.quickActionIcon, {backgroundColor: 'rgba(76, 217, 100, 0.2)'}]}>
              <Ionicons name="share-social" size={22} color="#4CD964" />
            </View>
            <Text style={[styles.quickActionText, isDarkMode && styles.darkModeText]}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Wishlist Section */}
        <View style={[styles.sectionContainer, isDarkMode && styles.darkModeCard]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="heart" size={22} color="#ff6347" />
              <Text style={[styles.sectionTitle, isDarkMode && styles.darkModeText]}>My Travel Wishlist</Text>
            </View>
            <TouchableOpacity onPress={() => setFullPageWishlist(true)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color={theme.tabBarActive} style={{marginVertical: 20}} />
          ) : wishlist.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.wishlistPreviewContainer}
            >
              {wishlist.slice(0, 5).map(item => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.wishlistPreviewItem}
                  onPress={() => setFullPageWishlist(true)}
                >
                  <Image 
                    source={{ uri: item.imageUrl }}
                    style={styles.wishlistPreviewImage}
                    resizeMode="cover"
                  />
                  <View style={styles.wishlistPreviewOverlay}>
                    <Text style={styles.wishlistPreviewText} numberOfLines={1}>{item.item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {wishlist.length > 5 && (
                <TouchableOpacity 
                  style={styles.moreWishlistButton}
                  onPress={() => setFullPageWishlist(true)}
                >
                  <Text style={styles.moreWishlistText}>+{wishlist.length - 5} more</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          ) : (
            <View style={styles.emptyStateContainer}>
              <Ionicons name="heart-outline" size={40} color={isDarkMode ? "#555" : "#ccc"} />
              <Text style={[styles.emptyStateText, isDarkMode && styles.darkModeText]}>
                Add destinations to your wishlist
              </Text>
              <TouchableOpacity 
                style={styles.addWishlistButton}
                onPress={() => setFullPageWishlist(true)}
              >
                <Text style={styles.addWishlistText}>Add Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActionsContainer}>
          <TouchableOpacity 
            style={[styles.settingsButton, isDarkMode && styles.darkModeButton]}
            onPress={() => setShowSettings(true)}
          >
            <Ionicons name="settings-outline" size={20} color={isDarkMode ? "#f0f0f0" : "#333"} />
            <Text style={[styles.actionButtonText, isDarkMode && styles.darkModeText]}>
              Settings
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.logoutButton, isDarkMode && styles.darkModeButtonAccent]}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {renderFullPageWishlist()}
        {renderSettingsModal()}
        {renderLanguageModal()}
        {renderCurrencyModal()}
        {renderSecurityModal()}
        {renderPrivacyModal()}
        {renderHelpModal()}
        {renderAboutModal()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsIconButton: {
    padding: 8,
    borderRadius: 20,
  },
  userIntroContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileGradient: {
    padding: 24,
    alignItems: 'center',
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInitialsContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4682B4',
  },
  wishlistPreviewContainer: {
    paddingVertical: 8,
  },
  wishlistPreviewItem: {
    width: 120,
    height: 160,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  wishlistPreviewImage: {
    width: '100%',
    height: '100%',
  },
  wishlistPreviewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  wishlistPreviewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  moreWishlistButton: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: 'rgba(70, 130, 180, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(70, 130, 180, 0.3)',
    borderStyle: 'dashed',
  },
  moreWishlistText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4682B4',
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    marginTop: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  addWishlistButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addWishlistText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 14,
    borderRadius: 12,
    marginRight: 10,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6347',
    padding: 14,
    borderRadius: 12,
    marginLeft: 10,
  },
  logoutButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  darkModeContainer: {
    backgroundColor: '#121212',
  },
  darkModeCard: {
    backgroundColor: '#1e1e1e',
  },
  darkModeText: {
    color: '#f0f0f0',
  },
  darkModeQuickAction: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  darkModeButton: {
    backgroundColor: '#2c2c2c',
  },
  darkModeButtonAccent: {
    backgroundColor: '#e63a2d',
  },
  fullPageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fullPageHeader: {
    backgroundColor: '#4682B4',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  closeButton: {
    padding: 10,
  },
  fullPageTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  fullPageContent: {
    padding: 20,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  wishlistContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'outfit',
    fontSize: 16,
    padding: 10,
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  addButton: {
    marginLeft: 10,
    padding: 5,
  },
  addButtonActive: {
    backgroundColor: '#4682B4',
    borderRadius: 20,
  },
  wishlistCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  wishlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fullPageWishlistItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  wishlistItemImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistItemImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#4682B4',
  },
  imageTitleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  imageTitleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wishlistItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  wishlistItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  removeButton: {
    padding: 5,
  },
  emptyWishlist: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyWishlistText: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: '#999',
    marginTop: 15,
  },
  emptyWishlistSubtext: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 40,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  settingsHeader: {
    backgroundColor: '#4682B4',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  settingsContent: {
    padding: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '80%',
    maxHeight: '80%',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionSelected: {
    backgroundColor: '#f0f8ff',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalOptionTextSelected: {
    color: '#4682B4',
    fontWeight: 'bold',
  },
  securityForm: {
    marginTop: 10,
  },
  securityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  securityInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  securityButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  securityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyContent: {
    marginTop: 10,
  },
  privacyText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  privacySection: {
    marginBottom: 20,
  },
  privacySectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  privacySectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  privacyButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  privacyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpContent: {
    marginTop: 10,
  },
  helpText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#333',
  },
  helpSection: {
    marginBottom: 20,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  helpSectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  helpButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  aboutLogo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  aboutAppName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  aboutVersion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  aboutDescription: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  aboutSection: {
    width: '100%',
    marginBottom: 20,
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  aboutSectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  aboutButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  aboutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;