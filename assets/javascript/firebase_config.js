import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { setDoc, doc, getDoc, getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPvm9RW7ABgg2u8ZX4FjQFN5moWOHoxbg",
    authDomain: "pin-8e7c8.firebaseapp.com",
    projectId: "pin-8e7c8",
    storageBucket: "pin-8e7c8.appspot.com",
    messagingSenderId: "463561637941",
    appId: "1:463561637941:web:5d71e7900e1b80b517b17c",
    measurementId: "G-7BFSEETLVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db, setDoc, doc, getDoc, collection, getDocs}