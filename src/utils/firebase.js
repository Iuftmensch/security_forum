import firebase from "firebase/app";//for firebase v9
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyCouwkVAxvVw4g5qg0d73eRpLVhC94KRYo",
    authDomain: "dtonomy-register.firebaseapp.com",
    projectId: "dtonomy-register",
    storageBucket: "dtonomy-register.appspot.com",
    messagingSenderId: "494605362069",
    appId: "1:494605362069:web:e43f070b187000f01f8c9c",
    measurementId: "G-HHJMGKG2FZ"
};

export const app = firebase.initializeApp(firebaseConfig);