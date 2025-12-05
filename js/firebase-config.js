import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// 1. Paste your Firebase Config Object here
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2. Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- AUTH FUNCTIONS ---

export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create the User Document in Firestore immediately
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      tier: "free", // Default tier
      progress: {}  // Empty progress map
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export function logoutUser() {
  return signOut(auth);
}

// --- DATABASE FUNCTIONS ---

// Get user profile (Tier + Progress)
export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// Mark a tutorial as complete
export async function markTutorialComplete(uid, tutorialKey) {
  const userRef = doc(db, "users", uid);
  // Uses Firestore dot notation to update nested map fields
  await updateDoc(userRef, {
    [`progress.${tutorialKey}`]: true 
  });
}

export { auth, onAuthStateChanged };