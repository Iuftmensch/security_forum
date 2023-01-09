import { REFRESH_FIREBASE_TOKEN } from './const';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const checkFirebase = () => {
    return new Promise((resolve,reject) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                resolve(user.getIdToken());
            }else{
                reject(null);
            }
        });
    })
}

export const refreshToken = (token) => {
    return {
        type: REFRESH_FIREBASE_TOKEN,
        token: token
    }
}