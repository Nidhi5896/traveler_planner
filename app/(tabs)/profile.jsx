import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, TextInput, Alert, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../configs/firebaseconfig'; // Fixed path with lowercase config
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [wishlistItem, setWishlistItem] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [fullPageWishlist, setFullPageWishlist] = useState(false);
  const [imageCache, setImageCache] = useState({});

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

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>
      
      {user && (
        <View style={styles.userIntroContainer}>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.userImage} />
          ) : (
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.userImage} 
            />
          )}
          <Text style={styles.userName}>{user.fullName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}

      {/* Wishlist Icon and Header */}
      <TouchableOpacity 
        style={styles.wishlistHeader}
        onPress={() => setFullPageWishlist(true)}
      >
        <View style={styles.wishlistHeaderContent}>
          <Ionicons name="heart" size={24} color="#4682B4" />
          <Text style={styles.wishlistTitle}>My Travel Wishlist</Text>
        </View>
        <View style={styles.wishlistCountBadge}>
          <Text style={styles.wishlistCountText}>{wishlist.length}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Share App</Text>
        </TouchableOpacity>
      </View>
      
      {/* <Text style={styles.footer}>Developed by Pushkal Vashishtha</Text> */}

      {renderFullPageWishlist()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
    color: '#333',
  },
  userIntroContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666',
  },
  wishlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  wishlistHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4682B4',
  },
  wishlistCountBadge: {
    backgroundColor: '#4682B4',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signOutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  footer: {
    fontFamily: 'outfit-medium',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  addWishlistButton: {
    backgroundColor: '#4682B4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addWishlistText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorBackupText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default Profile;