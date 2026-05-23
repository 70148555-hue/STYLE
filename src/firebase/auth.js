import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  signOut,
} from "firebase/auth";

import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 🔵 GOOGLE LOGIN
const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  // ✅ prevent duplicate users
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "No Name",
      email: user.email,
      role: "user",
      createdAt: new Date(),
    });
  }

  return user;
};

// 🔁 RESET PASSWORD
export const resetPassword = (email) => {
  if (!email) throw new Error("Email is required");

  return sendPasswordResetEmail(auth, email);
};

// 🚪 LOGOUT USER
export const logoutUser = () => {
  return signOut(auth);
};

// 🗑 DELETE ACCOUNT
export const deleteAccount = async () => {
  const user = auth.currentUser;

  if (!user) throw new Error("No user logged in");

  try {
    return await deleteUser(user);
  } catch (error) {
    console.log("DELETE ERROR:", error);
    throw error;
  }
};