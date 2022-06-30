import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCAGFY36gscmzyScZR9GVtRbisGvIVLpjs",
    authDomain: "recipie-9b6ae.firebaseapp.com",
    projectId: "recipie-9b6ae",
    storageBucket: "recipie-9b6ae.appspot.com",
    messagingSenderId: "177095497509",
    appId: "1:177095497509:web:50bad70d3f38479f112ccc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
