import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBQM70VjYJiHhy7dv1su_ntq9yV3LCnfnY",
    authDomain: "chat-app-f74c7.firebaseapp.com",
    projectId: "chat-app-f74c7",
    storageBucket: "chat-app-f74c7.appspot.com",
    messagingSenderId: "144050271829",
    appId: "1:144050271829:web:d23ca031580db54ae406dc",
    measurementId: "G-G9D7NWWSBG"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app) 