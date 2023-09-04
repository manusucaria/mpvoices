import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth';


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
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(firebaseApp);

// Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
setPersistence(auth, browserLocalPersistence);
