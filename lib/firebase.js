import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

const gProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, gProvider);
    const userQuery = query(ColUsersRef, where("uid", "==", user.user.uid));
    const userQuerySnapshot = await getDocs(userQuery);
    userQuerySnapshot.empty &&
      (await addDoc(ColUsersRef, {
        uid: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
        profilePic: user.user.photoURL,
        dinner: 0,
        milk: 0,
        gid: null,
        milkExtra: 0,
      }));
  } catch (err) {
    console.log(err.message);
  }
};

export const ColUsersRef = collection(db, "users");
export const ColMilkRef = collection(db, "milk");
export const ColDinnerRef = collection(db, "dinner");

export const addUserGroup = async (groupId) => {
  try {
    const firestoreUserQuery = query(
      ColUsersRef,
      where("uid", "==", auth.currentUser.uid)
    );
    const firestoreUserWeb = await getDocs(firestoreUserQuery);
    let firestoreUser = {};
    firestoreUserWeb.docs.forEach((doc) => {
      firestoreUser = { ...doc.data(), id: doc.id };
    });
    let userRef = doc(ColUsersRef, firestoreUser.id);
    await updateDoc(userRef, {
      gid: groupId,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const addDinner = async () => {
  try {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dinnerQuery = query(
      ColDinnerRef,
      where("date", ">=", todayDate),
      where("date", "<", tomorrowDate),
      where("uid", "==", auth.currentUser.uid)
    );
    const dinnerQuerySnapshot = await getDocs(dinnerQuery);
    if (dinnerQuerySnapshot.empty) {
      await addDoc(ColDinnerRef, {
        date: serverTimestamp(),
        uid: auth.currentUser.uid,
      });
      const firestoreUserQuery = query(
        ColUsersRef,
        where("uid", "==", auth.currentUser.uid)
      );
      const firestoreUserWeb = await getDocs(firestoreUserQuery);
      let firestoreUser = {};
      firestoreUserWeb.docs.forEach((doc) => {
        firestoreUser = { ...doc.data(), id: doc.id };
      });
      await updateDoc(doc(ColUsersRef, firestoreUser.id), {
        dinner: firestoreUser.dinner + 1,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const addMilk = async (milk, extra) => {
  try {
    const firestoreUserQuery = query(
      ColUsersRef,
      where("uid", "==", auth.currentUser.uid)
    );
    const firestoreUserWeb = await getDocs(firestoreUserQuery);
    let firestoreUser = {};
    firestoreUserWeb.docs.forEach((doc) => {
      firestoreUser = { ...doc.data(), id: doc.id };
    });
    await addDoc(ColMilkRef, {
      date: serverTimestamp(),
      uid: auth.currentUser.uid,
      milk: milk,
      extra: extra,
      gid: firestoreUser.gid,
    });
    await updateDoc(doc(ColUsersRef, firestoreUser.id), {
      milk: firestoreUser.milk + milk,
      milkExtra: firestoreUser.milkExtra + extra,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const clearMilk = async () => {
  try {
    const firestoreUserQuery = query(
      ColUsersRef,
      where("uid", "==", auth.currentUser.uid)
    );
    const firestoreUserWeb = await getDocs(firestoreUserQuery);
    let firestoreUser = {};
    firestoreUserWeb.docs.forEach((doc) => {
      firestoreUser = { ...doc.data(), id: doc.id };
    });
    const milkUsersQuery = query(
      ColUsersRef,
      where("gid", "==", firestoreUser.gid)
    );
    const milkUsersWeb = await getDocs(milkUsersQuery);
    let milkUsers = [];
    milkUsersWeb.docs.forEach((doc) => {
      milkUsers.push({ ...doc.data(), id: doc.id });
    });
    milkUsers.forEach(async (user) => {
      await updateDoc(doc(ColUsersRef, user.id), {
        milk: 0,
        milkExtra: 0,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const clearDinner = async () => {
  try {
    const firestoreUserQuery = query(
      ColUsersRef,
      where("uid", "==", auth.currentUser.uid)
    );
    const firestoreUserWeb = await getDocs(firestoreUserQuery);
    let firestoreUser = {};
    firestoreUserWeb.docs.forEach((doc) => {
      firestoreUser = { ...doc.data(), id: doc.id };
    });
    await updateDoc(doc(ColUsersRef, firestoreUser.id), {
      dinner: 0,
    });
  } catch (err) {
    console.log(err.message);
  }
};
