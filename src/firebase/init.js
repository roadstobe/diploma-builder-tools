import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3et5ju7RvscolqD2xJqwwaRVEvprtpew",
  authDomain: "proj-tool-lists.firebaseapp.com",
  databaseURL: "https://proj-tool-lists.firebaseio.com",
  projectId: "proj-tool-lists",
  storageBucket: "proj-tool-lists.appspot.com",
  messagingSenderId: "8694112259",
  appId: "1:8694112259:web:ef20276fa037796ec12e36",
  measurementId: "G-TC8JBL1HHZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();
