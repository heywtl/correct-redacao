import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyBP5C0GE9c_hFhX9ODaAbeqExyy1iy0k_U',
    authDomain: 'correct.firebaseapp.com',
    databaseURL: '',
    projectId: 'correct-essay',
    storageBucket: '',
    messagingSenderId: '446456364879'
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
