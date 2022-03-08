import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCHN1Z79u5Skg_nNKP2HC3IBSXeifl_ERc',
    authDomain: 'finance-tracker-90727.firebaseapp.com',
    projectId: 'finance-tracker-90727',
    storageBucket: 'finance-tracker-90727.appspot.com',
    messagingSenderId: '355908176027',
    appId: '1:355908176027:web:92628918119f1ecfc69e3e',
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
