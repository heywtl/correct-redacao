import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBP5C0GE9c_hFhX9ODaAbeqExyy1iy0k_U",
    authDomain: "correct-essay.firebaseapp.com",
    databaseURL: "https://correct-essay.firebaseio.com",
    projectId: "correct-essay",
    storageBucket: "correct-essay.appspot.com",
    messagingSenderId: "446456364879",
    appId: "1:446456364879:web:bfff1449a88b7632264f3a",
    measurementId: "G-2DB51YCVHH"
  };

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.GoogleAuthProvider();

export default { db, auth, google, facebook };
