// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a8e92.firebaseapp.com",
  projectId: "mern-auth-a8e92",
  storageBucket: "mern-auth-a8e92.appspot.com",
  messagingSenderId: "802654013436",
  appId: "1:802654013436:web:4961dc3659612cc3285479",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
