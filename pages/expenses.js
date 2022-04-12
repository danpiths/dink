import Head from "next/head";
import { useEffect } from "react";
import DinnerExpenseCard from "../components/DinnerExpenseCard";
import Loader from "../components/Loader";
import MilkExpenseCard from "../components/MilkExpenseCard";
import { useUserContext } from "../context/UserContext";

export default function Expense() {
  const { user, isLoading, router, firestoreUser } = useUserContext();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (!isLoading && firestoreUser && !firestoreUser?.gid) {
      router.push("/");
    }
  }, [isLoading, user, router, firestoreUser]);

  return (
    <div className="flex flex-1 flex-col gap-5 p-6">
      <Head>
        <title>Expenses | Dink</title>
      </Head>
      {isLoading || !firestoreUser ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">Expenses</h1>
          <div className="flex flex-col justify-center gap-3">
            <MilkExpenseCard />
            <DinnerExpenseCard />
          </div>
          <a
            href="/"
            className="self-stretch rounded-sm bg-gray-700 px-4 py-3 text-center font-bold uppercase tracking-wider text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
          >
            Back Home
          </a>
        </>
      )}
    </div>
  );
}
