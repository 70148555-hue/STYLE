import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const productsRef = collection(db, "products");


// 🟢 ADD PRODUCT (with seller support)
export const addProduct = async (data) => {
  return await addDoc(productsRef, data);
};


// 🟢 GET ALL PRODUCTS
export const getProducts = async () => {
  const snap = await getDocs(productsRef);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// 🟢 GET SINGLE PRODUCT (for detail page)
export const getProduct = async (id) => {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  } else {
    return null;
  }
};


// 🟢 UPDATE PRODUCT (OWNER OR ADMIN CONTROL HANDLED IN UI)
export const updateProduct = async (id, data) => {
  const ref = doc(db, "products", id);
  return await updateDoc(ref, data);
};


// 🟢 DELETE PRODUCT
export const deleteProduct = async (id) => {
  const ref = doc(db, "products", id);
  return await deleteDoc(ref);
};