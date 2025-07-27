// import { db } from "../firebase/firebaseConfig";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
//   onSnapshot,
// } from "firebase/firestore";

// const productRef = collection(db, "products");

// export const addProduct = async (product) => {
//   const docRef = await addDoc(productRef, product);
//   return { id: docRef.id, ...product };
// };

// export const getProducts = async () => {
//   const snapshot = await getDocs(productRef);
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// export const updateProduct = async (id, data) => {
//   const docRef = doc(db, "products", id);
//   await updateDoc(docRef, data);
// };

// export const deleteProduct = async (id) => {
//   const docRef = doc(db, "products", id);
//   await deleteDoc(docRef);
// };

// export const subscribeToProducts = (callback) => {
//   return onSnapshot(productRef, (snapshot) => {
//     const products = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     callback(products);
//   });
// };
