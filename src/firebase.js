import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// SET YOUR KEYS IN .env.local  --  DO NOT COMMIT .env TO GITHUB
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_apiKey,
    //authDomain: process.env.VUE_APP_FIREBASE_authDomain,
    projectId: process.env.VUE_APP_FIREBASE_projectId,
    storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
    messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
    appId: process.env.VUE_APP_FIREBASE_appId,
    measurementId: process.env.VUE_APP_FIREBASE_measurementId
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
