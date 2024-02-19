// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcsrG92b8zd4h2AXvrGsiskSspLJ9sTL8",
    authDomain: "product-catelog-c2e12.firebaseapp.com",
    projectId: "product-catelog-c2e12",
    storageBucket: "product-catelog-c2e12.appspot.com",
    messagingSenderId: "239088547592",
    appId: "1:239088547592:web:21c244815138ee87afdebd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service

export const auth = getAuth();  