// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "movies-app-883a8.firebaseapp.com",
  projectId: "movies-app-883a8",
  storageBucket: "movies-app-883a8.firebasestorage.app",
  messagingSenderId: "307789475110",
  appId: "1:307789475110:web:7f6f615ac3df0ace2b65e7",
  measurementId: "G-HVTRECWNVV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { auth, storage, firestore };
