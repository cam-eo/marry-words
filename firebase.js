// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

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
// const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();

// probs gotta setup env variables https://medium.com/swlh/how-to-properly-use-environment-variables-in-an-expo-react-native-app-7ab852590b30#:~:text=An%20environment%20variable%20is%20a,to%20be%20imported%20at%20all.
