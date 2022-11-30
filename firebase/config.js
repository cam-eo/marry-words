// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMpC06lDVFoBmQ3FkA1zfJ5fVjGNv82AE",
  authDomain: "marry-words.firebaseapp.com",
  databaseURL:
    "https://marry-words-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "marry-words",
  storageBucket: "marry-words.appspot.com",
  messagingSenderId: "797845934226",
  appId: "1:797845934226:web:1dc4363fc56627e8e6964b",
  measurementId: "G-DS5H6K0JT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
