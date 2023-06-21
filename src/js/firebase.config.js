import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyCJdwE8ixBrnLCMROP0SiXypZDixm-8UqA",
  
    authDomain: "project-alexandria-9ecc5.firebaseapp.com",
  
    projectId: "project-alexandria-9ecc5",
  
    storageBucket: "project-alexandria-9ecc5.appspot.com",
  
    messagingSenderId: "192756594657",
  
    appId: "1:192756594657:web:5cebb0e83d6a7ff20904a0",
  
    measurementId: "G-KBT5957LEF"
  
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()