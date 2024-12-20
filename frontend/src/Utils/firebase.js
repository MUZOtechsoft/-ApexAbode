// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHAKdD2dS0RSq6g4H8QVsYMfjetiRkE-A",
    authDomain: "apexabode-susty.firebaseapp.com",
    projectId: "apexabode-susty",
    storageBucket: "apexabode-susty.appspot.com",
    messagingSenderId: "739356218328",
    appId: "1:739356218328:web:3a0cd03316c3c5c774d8ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
