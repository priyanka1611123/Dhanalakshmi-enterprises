// ─────────────────────────────────────────────────────────────
//  DL Enterprises – Firebase Configuration
//  IMPORTANT: Replace these values with your own Firebase project
//  Go to: console.firebase.google.com → New Project → Web App
// ─────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // ⚠️  REPLACE WITH YOUR FIREBASE CONFIG FROM console.firebase.google.com
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
