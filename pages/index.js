import Head from "next/head";
import { useEffect } from "react";
import HomeMenu from "../components/HomeMenu";
import Loader from "../components/Loader";
import { useUserContext } from "../context/UserContext";

export default function Home() {
  const { user, isLoading, router, firestoreUser } = useUserContext();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (!isLoading && firestoreUser && !firestoreUser?.gid) {
      router.push("/registerGroup");
    }
  }, [isLoading, user, router, firestoreUser]);

  return (
    <div className="flex flex-1 flex-col gap-3 p-6">
      <Head>
        <title>Dink</title>
      </Head>

      {isLoading || !firestoreUser ? <Loader /> : <HomeMenu />}
    </div>
  );
}
