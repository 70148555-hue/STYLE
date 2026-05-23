// Import Firebase functions
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_ZK_7xczqlm-APjSlcIncdCiKx7JLh2c",
  authDomain: "stylehub-b4039.firebaseapp.com",
  databaseURL: "https://stylehub-b4039-default-rtdb.firebaseio.com",
  projectId: "stylehub-b4039",
  storageBucket: "stylehub-b4039.firebasestorage.app",
  messagingSenderId: "15300430645",
  appId: "1:15300430645:web:d6c43c74f6327cd1de1a7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Google Provider
export const provider = new GoogleAuthProvider();

// Export app
export default app;