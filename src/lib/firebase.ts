import { initializeApp } from "firebase/app";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFm09KUzVbXbs3BDi_-aBNqqqi9V02hSs",
  authDomain: "project-management-19fa8.firebaseapp.com",
  projectId: "project-management-19fa8",
  storageBucket: "project-management-19fa8.firebasestorage.app",
  messagingSenderId: "797067471832",
  appId: "1:797067471832:web:2e7f8dc48e27d6500ca0ad",
  measurementId: "G-FCQNPMJLV5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
