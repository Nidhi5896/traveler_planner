// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz5g5q5kmEaZ4EPGybJ1RG9xsESWRoe3Q",
  authDomain: "ai-traveller-app-50082.firebaseapp.com",
  projectId: "ai-traveller-app-50082",
  storageBucket: "ai-traveller-app-50082.firebasestorage.app",
  messagingSenderId: "835862931568",
  appId: "1:835862931568:web:37ce09b89f3eb089b8acb5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
