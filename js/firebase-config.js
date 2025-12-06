<script type="module">

  // -----------------------------
  // IMPORT FIREBASE SDK
  // -----------------------------
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

  import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc 
  } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";


  // -----------------------------
  // FIREBASE CONFIG (YOUR DATA)
  // -----------------------------
  const firebaseConfig = {
    apiKey: "AIzaSyC1Tk8yq4rpuMbzA-hK-P3cFr4MvHm30rY",
    authDomain: "saga-academy-eb367.firebaseapp.com",
    projectId: "saga-academy-eb367",
    storageBucket: "saga-academy-eb367.firebasestorage.app",
    messagingSenderId: "1023922985700",
    appId: "1:1023922985700:web:35674d58a2e69f8b252af1",
    measurementId: "G-D300B31CTR"
  };


  // -----------------------------
  // INITIALIZE FIREBASE
  // -----------------------------
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const db = getFirestore(app);


  // -----------------------------
  // REGISTER USER
  // -----------------------------
  export async function registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create Firestore document
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",    // default user
        tier: "free",    // default tier
        progress: {
          imageToVideo: false,
          textToVideo: false
        }
      });

      return user;

    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }


  // -----------------------------
  // LOGIN USER
  // -----------------------------
  export async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }


  // -----------------------------
  // LOGOUT
  // -----------------------------
  export function logoutUser() {
    return signOut(auth);
  }


  // -----------------------------
  // GET USER PROFILE
  // -----------------------------
  export async function getUserProfile(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : null;
  }


  // -----------------------------
  // UPDATE TUTORIAL PROGRESS
  // -----------------------------
  export async function markTutorialComplete(uid, tutorialKey) {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      [`progress.${tutorialKey}`]: true
    });
  }

</script>
