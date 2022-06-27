import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDWlHs8GQklITnClFatmLyyaunruQQsMsk",
  authDomain: "brihope-b5576.firebaseapp.com",
  projectId: "brihope-b5576",
  storageBucket: "brihope-b5576.appspot.com",
  messagingSenderId: "792812195715",
  appId: "1:792812195715:web:8e01f8a1d09651d0a570b6",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();
const auth = getAuth();

export { auth, db };
