import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useState, useContext, useEffect } from "react";
import { auth, ColDinnerRef, ColUsersRef } from "../lib/firebase";

const UserContext = createContext();

export function UserContextWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [canAddDinner, setCanAddDinner] = useState(true);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [milkUsers, setMilkUsers] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const firestoreUserQuery = query(
        ColUsersRef,
        where("uid", "==", auth.currentUser.uid)
      );
      const unSubFirestoreUser = onSnapshot(firestoreUserQuery, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setFirestoreUser({ ...doc.data(), id: doc.id });
        });
      });
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const tomorrowDate = new Date(todayDate);
      tomorrowDate.setDate(tomorrowDate.getDate() + 1);
      const canAddDinnerQuery = query(
        ColDinnerRef,
        where("date", ">=", todayDate),
        where("date", "<", tomorrowDate),
        where("uid", "==", auth.currentUser.uid)
      );
      const unSubCanAddDinner = onSnapshot(canAddDinnerQuery, (snapshot) => {
        snapshot.empty ? setCanAddDinner(true) : setCanAddDinner(false);
      });
      const unSub = () => {
        unSubFirestoreUser();
        unSubCanAddDinner();
      };
      return unSub;
    }
  }, [user]);

  useEffect(() => {
    const unSubAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return unSubAuth;
  }, []);

  useEffect(() => {
    if (firestoreUser) {
      const milkUsersQuery = query(
        ColUsersRef,
        where("gid", "==", firestoreUser.gid),
        orderBy("name", "asc")
      );
      const unSubMilkUsers = onSnapshot(milkUsersQuery, (snapshot) => {
        let milkUsers = [];
        snapshot.docs.forEach((doc) => {
          milkUsers.push({ ...doc.data(), id: doc.id });
        });
        setMilkUsers(milkUsers);
      });
      return unSubMilkUsers;
    }
  }, [firestoreUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setIsLoading,
        router,
        firestoreUser,
        canAddDinner,
        milkUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
