// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgl_Zu4Jm-lnT2gAQv3BHhNWNs9cHESOo",
  authDomain: "tonyx-597ca.firebaseapp.com",
  projectId: "tonyx-597ca",
  storageBucket: "tonyx-597ca.appspot.com",
  messagingSenderId: "558863030825",
  appId: "1:558863030825:web:e633a8b097cd6add69da38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);