// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5oRHbUNpzWHEhtsVHfZgK_xx-h69UDKc",
  authDomain: "zataakse-task.firebaseapp.com",
  projectId: "zataakse-task",
  storageBucket: "zataakse-task.firebasestorage.app",
  messagingSenderId: "876464775635",
  appId: "1:876464775635:web:f531d378e6a627f6908f26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);