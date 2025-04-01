import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TranslationService from './TranslationService';

const { width } = Dimensions.get('window');

const TranslatorButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Show tooltip on first appearance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowTooltip(false));
    }, 5000);

    // Start pulse animation
    const startPulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start(() => startPulse());
    };
    
    startPulse();

    return () => clearTimeout(timer);
  }, []);

  const toggleModal = () => {
    console.log('Toggling translator modal, current state:', !modalVisible);
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <View style={styles.buttonContainer}>
        {showTooltip && (
          <Animated.View 
            style={[
              styles.tooltip, 
              { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
              })}] 
            }]
          }>
            <Text style={styles.tooltipText}>Translate any text during your trip!</Text>
            <View style={styles.tooltipArrow} />
          </Animated.View>
        )}
        
        <Animated.View style={[
          styles.glow,
          { transform: [{ scale: pulseAnim }] }
        ]} />
        
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={toggleModal}
          activeOpacity={0.8}
        >
          <Ionicons name="language" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Travel Translator</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <TranslationService />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 999,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1000,
  },
  glow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(70, 130, 180, 0.3)',
    zIndex: 999,
  },
  tooltip: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  tooltipText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -10,
    right: 25,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
  },
  closeButton: {
    padding: 5,
  },
});

export default TranslatorButton; 