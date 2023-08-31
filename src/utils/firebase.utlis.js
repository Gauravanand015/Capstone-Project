// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
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

export const addCollectionAndDocuments = async (
  collectionName,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  });
  await batch.commit();
  // console.log("Done");
};

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  // console.log(querySnapShot.docs);
  const categoryMap = querySnapShot.docs.map((docSnapShot) =>
    docSnapShot.data()
  );
  // .reduce((acc, docsSnapShot) => {
  //   const { title, items } = docsSnapShot.data();
  //   acc[title.toLowerCase()] = items;

  //   return acc;
  // }, []);

  return categoryMap;
};

export const createUserDocumentWithAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  // console.log(userAuth.uid);
  const userDocRef = doc(db, "users", userAuth.uid);

  const userRef = await getDoc(userDocRef);
  // console.log(userRef.exists());

  if (!userRef.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error while creating user", error.message);
    }
  }

  return userRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
