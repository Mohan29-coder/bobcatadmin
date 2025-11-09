import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "YOUR_EXISTING_API_KEY",
    authDomain: "YOUR_EXISTING_PROJECT.firebaseapp.com",
    projectId: "YOUR_EXISTING_PROJECT_ID",
    storageBucket: "YOUR_EXISTING_BUCKET.appspot.com",
    messagingSenderId: "YOUR_EXISTING_SENDER_ID",
    appId: "YOUR_EXISTING_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);