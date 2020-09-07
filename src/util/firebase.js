import *  as firebase from 'firebase'
  
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCfjFVLW74fPt0FSBl8ksMBbzdmPmH4TxA",
  authDomain: "recipe-app-f83d1.firebaseapp.com",
  projectId: "recipe-app-f83d1",
  storageBucket: "recipe-app-f83d1.appspot.com",
  appId: "1:444237409340:web:86986a03328053215b6739",
  measurementId: "G-FY3Q90NVRQ"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()