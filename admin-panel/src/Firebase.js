import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBj6aXHtdRqUyeSUazACqQbsZcTTVLP4U",
    authDomain: "bobcat-65b3b.firebaseapp.com",
    projectId: "bobcat-65b3b",
    storageBucket: "bobcat-65b3b.firebasestorage.app",
    messagingSenderId: "655074041293",
    appId: "1:655074041293:web:39d5c2e5191941588cb884"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
