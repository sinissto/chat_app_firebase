// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_9w0SOAJ-yvvnvPEqMsaYalgco4iXym8",
  authDomain: "chat-ad8b8.firebaseapp.com",
  projectId: "chat-ad8b8",
  storageBucket: "chat-ad8b8.appspot.com",
  messagingSenderId: "483751395188",
  appId: "1:483751395188:web:d34a47ec6ecf394b617621",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
