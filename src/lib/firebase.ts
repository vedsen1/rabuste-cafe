// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZDxMsDeGybbjKUnF3THaNcNG5wQEIA38",
  authDomain: "rabustecafe.firebaseapp.com",
  projectId: "rabustecafe",
  storageBucket: "rabustecafe.firebasestorage.app",
  messagingSenderId: "947845672904",
  appId: "1:947845672904:web:282fdec3b848519acedafd",
  measurementId: "G-6HLW2BP54M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
