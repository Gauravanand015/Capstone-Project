// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe_qUNGdT3RiXKzggc3q9B5SzOpRjhMD0",
  authDomain: "crown-clothing-db-83143.firebaseapp.com",
  projectId: "crown-clothing-db-83143",
  storageBucket: "crown-clothing-db-83143.appspot.com",
  messagingSenderId: "778750960072",
  appId: "1:778750960072:web:062d7731bb249d48c1e0fd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentWithAuth = async (userAuth,additionalInfo = {}) => {
  console.log(userAuth.uid)
  const userDocRef = doc(db, "users", userAuth.uid);

  const userRef = await getDoc(userDocRef);
  console.log(userRef.exists());

  if (!userRef.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log("error while creating user", error.message);
    }
  }

  return userDocRef;
};

export const creteAuthUserWithEmailAndPassword = async(email,password) =>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password)
}

export const signInAuthUserWithEmailAndPassword = async(email,password) =>{
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = ( callback) => onAuthStateChanged(auth,callback)