// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOInAKxKFEWeR3veuULJsdoWdr27iNl78",
  authDomain: "the-floating-school.firebaseapp.com",
  databaseURL: "https://the-floating-school-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-floating-school",
  storageBucket: "the-floating-school.appspot.com",
  messagingSenderId: "220736805269",
  appId: "1:220736805269:web:0abe2f0eb490433378fe9c",
  measurementId: "G-TDC7QW4H44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth};