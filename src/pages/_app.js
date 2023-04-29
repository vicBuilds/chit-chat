import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import Loader from "@/components/Loader";
import Login from "./Login";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      console.log(user);
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }
  console.log(user);
  if (!user) {
    return <Login />;
  }
  return <Component {...pageProps} />;
}
