import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Collection Reference
const productsCollection = collection(db, "products");

// Add Product
export const addProduct = async (productData) => {
  return await addDoc(productsCollection, productData);
};

// Get Products
export const getProducts = async () => {

  try {

    const snapshot = await getDocs(productsCollection);

    return snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));

  } catch (error) {

    console.log(error);

    return [];
  }
};

// Delete Product
export const deleteProduct = async (id) => {

  const productDoc = doc(db, "products", id);

  return await deleteDoc(productDoc);
};