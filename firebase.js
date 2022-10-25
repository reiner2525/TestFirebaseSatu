// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7eLQ3kLGEsOiUMbxctIFhyUnr4WWCGuM",
  authDomain: "test-firebase-1-ba47a.firebaseapp.com",
  projectId: "test-firebase-1-ba47a",
  storageBucket: "test-firebase-1-ba47a.appspot.com",
  messagingSenderId: "591583649965",
  appId: "1:591583649965:web:c4798b2894996423b9a624",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
