// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_ZK_7xczqlm-APjSlcIncdCiKx7JLh2c",
  authDomain: "stylehub-b4039.firebaseapp.com",
  projectId: "stylehub-b4039",
  storageBucket: "stylehub-b4039.appspot.com",
  messagingSenderId: "15300430645",
  appId: "1:15300430645:web:d6c43c74f6327cd1de1a7c"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// 🔐 Auth service
export const auth = getAuth(app);

// 🛢 Firestore database
export const db = getFirestore(app);