import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './../../../configs/firebaseconfig' // Adjust the path to your Firebase config file


export default function Index() {
  const navigation = useNavigation(); // Used to remove the header
  const router=useRouter();//use for ,ovong from one page to anothe rpage

  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[fullName,setFullName]=useState();
  useEffect(() => {
    navigation.setOptions({//use to off the header
      headerShown: false,
    });
  }, [navigation]);

  const OnCreateAccount=()=>{
    if(!email || !password || !fullName) {
      ToastAndroid.show('Please enter all details',ToastAndroid.LONG);
      return;
    }
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        updateProfile(user, {
          displayName: fullName
        }).then(() => {
          console.log('Profile updated!');
          ToastAndroid.show('Account created successfully!', ToastAndroid.LONG);
          router.replace('/mytrip');
        }).catch((error) => {
          console.log('Profile update error:', error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        
        let errorText = 'Signup failed. Please try again.';
        if (errorCode === 'auth/email-already-in-use') {
          errorText = 'Email already registered';
        } else if (errorCode === 'auth/weak-password') {
          errorText = 'Password should be at least 6 characters';
        } else if (errorCode === 'auth/invalid-email') {
          errorText = 'Invalid email format';
        }
        
        ToastAndroid.show(errorText, ToastAndroid.LONG);
      });
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.WHITE }}>
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 15,
          fontWeight: 'bold',
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        Create New Account
      </Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ marginBottom: 5 ,fontWeight:'bold'}}>Enter Full Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          placeholder="Enter full name"
          onChangeText={(value)=>setFullName(value)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 5,fontWeight:'bold' }}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          placeholder="Enter email"
          onChangeText={(value)=>setEmail(value)}
          keyboardType="email-address"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 5 ,fontWeight:'bold'}}>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          secureTextEntry={true}
          onChangeText={(value)=>setPassword(value)}
          placeholder="Enter password"
        />
      </View>

      <TouchableOpacity onPress={OnCreateAccount}
        style={{
          borderRadius: 70,
          padding: 15,
          alignItems: 'center',
          backgroundColor: Colors.BLACK,
          marginTop: 30,
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 17 }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.replace('auth/signin')}
        style={{
          borderRadius: 70,
          padding: 15,
          alignItems: 'center',
          backgroundColor: Colors.BLACK,
          marginTop: 20,
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 17 }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
