import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_ZK_7xczqlm-APjSlcIncdCiKx7JLh2c",
  authDomain: "stylehub-b4039.firebaseapp.com",
  projectId: "stylehub-b4039",
  storageBucket: "stylehub-b4039.appspot.com",
  messagingSenderId: "15300430645",
  appId: "1:15300430645:web:d6c43c74f6327cd1de1a7c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 IMPORTANT FIX (STAY LOGGED IN)
setPersistence(auth, browserLocalPersistence);