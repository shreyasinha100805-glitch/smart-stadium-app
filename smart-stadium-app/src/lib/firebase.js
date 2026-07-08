import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBal1uKwqhmtoo7tPirmTi43Gpa31pAPUE",
  authDomain: "smart-stadium-app.firebaseapp.com",
  projectId: "smart-stadium-app",
  storageBucket: "smart-stadium-app.firebasestorage.app",
  messagingSenderId: "6493650084",
  appId: "1:6493650084:web:efef7259311d7b1587ba31",
  measurementId: "G-HJN37Q3R3G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);