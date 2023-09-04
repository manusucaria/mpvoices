import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyCiQ2otjm-dNhOgf_ayBh-hRV1OhbTjido",
    authDomain: "voices-822e3.firebaseapp.com",
    projectId: "voices-822e3",
    storageBucket: "voices-822e3.appspot.com",
    messagingSenderId: "29561065506",
    appId: "1:29561065506:web:051d732319e25ed3413a7b",
    measurementId: "G-S32B85PYJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);