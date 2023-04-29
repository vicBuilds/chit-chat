import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC6bkTyxEVUTEB3YvrVS5x1ahh5ajKk46E",
  authDomain: "whatsapp-2-39f7c.firebaseapp.com",
  projectId: "whatsapp-2-39f7c",
  storageBucket: "whatsapp-2-39f7c.appspot.com",
  messagingSenderId: "678602717278",
  appId: "1:678602717278:web:2de4bbcac39065e7c91ccf",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
