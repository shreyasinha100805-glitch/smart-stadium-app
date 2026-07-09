import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createMockAuth } from "./mockAuth.js";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isBrowser = typeof window !== "undefined";
const isPlaceholderValue = (value) =>
  typeof value === "string" &&
  (value.includes("your_") || value.includes("example") || value.includes("placeholder"));

const validConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  !isPlaceholderValue(firebaseConfig.apiKey) &&
  !isPlaceholderValue(firebaseConfig.authDomain) &&
  !isPlaceholderValue(firebaseConfig.projectId);

let app = null;
let authInstance = null;

// Initialize Firebase if config is valid
if (isBrowser && validConfig) {
  try {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
  }
} else if (isBrowser && !validConfig) {
  console.warn("Firebase config is not valid; falling back to mock auth.");
}

export const auth = authInstance || (isBrowser ? createMockAuth() : null);
export const db = app ? getFirestore(app) : null;