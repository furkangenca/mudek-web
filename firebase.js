
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDNPitCwLrB_0wnCB5QaEipH7VO5A2aslA",
    authDomain: "mudek-e678a.firebaseapp.com",
    projectId: "mudek-e678a",
    storageBucket: "mudek-e678a.appspot.com",
    messagingSenderId: "311983922645",
    appId: "1:311983922645:web:eb27fef35bd5b5840cb15c"
  };


  // Firebase uygulamasını başlatma
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
  
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  export { auth };
  export { db };
  export {firebase};
  
  
  