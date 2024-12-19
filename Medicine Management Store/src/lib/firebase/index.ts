import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCLzwupobNZbO8KPjN5a5LKdbDSgUbqtB4",
  authDomain: "medicine-22d75.firebaseapp.com",
  projectId: "medicine-22d75",
  storageBucket: "medicine-22d75.firebasestorage.app",
  messagingSenderId: "713481187205",
  appId: "1:713481187205:web:1816fa6f39cdc575965eec",
  measurementId: "G-B4GJ1BNDCS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);