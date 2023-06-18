import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc3UPgznxTM1JjzsUCDqapDTM96dF0Eso",
  authDomain: "uploadimage-e74d5.firebaseapp.com",
  projectId: "uploadimage-e74d5",
  storageBucket: "uploadimage-e74d5.appspot.com",
  messagingSenderId: "45873012928",
  appId: "1:45873012928:web:d928fa244f4576a01b8d25",
  measurementId: "G-0HJHH22HMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
