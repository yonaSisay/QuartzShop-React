// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsO1yI9IY4-Mv-P06RweUgjEQVANP8V1k",
    authDomain: "quartz-shop.firebaseapp.com",
    projectId: "quartz-shop",
    storageBucket: "quartz-shop.firebasestorage.app",
    messagingSenderId: "3755583209",
    appId: "1:3755583209:web:02950eb03e396eedb5f278",
    measurementId: "G-EH896X1K3C"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);
export const auth = getAuth(app);
export const db = getFirestore(app);
