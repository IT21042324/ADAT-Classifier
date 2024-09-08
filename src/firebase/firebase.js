// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALkAygclfgqbVotnL_XQ6TPlm9VoWHk0s",
  authDomain: "adat-classifier-92c70.firebaseapp.com",
  projectId: "adat-classifier-92c70",
  storageBucket: "adat-classifier-92c70.appspot.com",
  messagingSenderId: "257890341730",
  appId: "1:257890341730:web:fbd43ae2f49acfd3bb123b",
  measurementId: "G-CT8R6L41Z2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
