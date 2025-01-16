// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFGcI1o1mVxmtPFiX0br2Swk1dRZz5FTk",
  authDomain: "blogapp-23029.firebaseapp.com",
  projectId: "blogapp-23029",
  storageBucket: "blogapp-23029.firebasestorage.app",
  messagingSenderId: "841481338616",
  appId: "1:841481338616:web:e6fdc0105a90ffd523c50d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
