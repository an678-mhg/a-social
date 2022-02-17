// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlh9VG-gx4r1NrdGut1_s2gNHIiTMF4-c",
  authDomain: "asocial-db351.firebaseapp.com",
  projectId: "asocial-db351",
  storageBucket: "asocial-db351.appspot.com",
  messagingSenderId: "955224939280",
  appId: "1:955224939280:web:6616aa80c2c553278ee395",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const stogare = getStorage(app);

export { db, auth, googleProvider, stogare };
