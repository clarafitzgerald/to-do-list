import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// Basic firebase configuration linking web application to database - see firebase documentation
var firebaseConfig = {
  apiKey: "AIzaSyCbQL9KU2eF1LErhWVIeug-YH483boaZqs",
  authDomain: "to-do-list-a48ca.firebaseapp.com",
  databaseURL: "https://to-do-list-a48ca.firebaseio.com",
  projectId: "to-do-list-a48ca",
  storageBucket: "to-do-list-a48ca.appspot.com",
  messagingSenderId: "170501239068",
  appId: "1:170501239068:web:3159074bc3fc8981f68ad9",
  measurementId: "G-D8RXC4P3LJ"
};

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to provider for google signin
export const provider = new firebase.auth.GoogleAuthProvider();

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
