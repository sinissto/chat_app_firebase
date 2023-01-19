import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhedOwKB-13L6Ta3W_-fDebJOp1ITzq7o",
  authDomain: "chat-10f64.firebaseapp.com",
  projectId: "chat-10f64",
  storageBucket: "chat-10f64.appspot.com",
  messagingSenderId: "477231302114",
  appId: "1:477231302114:web:7aeaa5121d3fdcdb67a5bb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
