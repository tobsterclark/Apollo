import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
  
const firebaseConfig = {
    apiKey: "AIzaSyBLyGe_YH7WoG5INo2VqlTIFVC9PUO5tC4",
    authDomain: "apollo-9dd16.firebaseapp.com",
    databaseURL: "https://apollo-9dd16-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "apollo-9dd16",
    storageBucket: "apollo-9dd16.appspot.com",
    messagingSenderId: "156842763490",
    appId: "1:156842763490:web:47fdb3281a358516f62abb",
    measurementId: "G-PH742VC9HK"
  };
    
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth()
  
export default database
export {auth}