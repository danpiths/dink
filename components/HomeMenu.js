import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { addDinner, auth } from "../lib/firebase";
import MilkModal from "./MilkModal";

export default function HomeMenu() {
  const { firestoreUser, canAddDinner } = useUserContext();
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <img
            className="w-8 rounded-full"
            src={auth.currentUser?.photoURL}
            alt={`${auth.currentUser?.displayName.split(" ")[0]}'s Profile Pic`}
          />
          <h1 className="text-center text-2xl font-bold">
            Welcome, {auth.currentUser?.displayName.split(" ")[0]}!
          </h1>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <p>Group: {firestoreUser?.gid}</p>
          <a
            href="/registerGroup"
            className="rounded-sm bg-gray-700 px-3 py-1 text-xs text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
          >
            Change
          </a>
        </div>
      </div>

      <button
        className="mt-4 flex-1 rounded-sm bg-gray-700 px-4 py-5 font-bold uppercase tracking-wider text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
        onClick={async () => {
          try {
            await addDinner();
          } catch (err) {
            console.log(err.message);
          }
        }}
        disabled={!canAddDinner}
      >
        {canAddDinner ? "Add Dinner" : "Dinner Added"}
      </button>
      <button
        className="flex-1 rounded-sm bg-gray-200 px-4 py-5 font-bold uppercase tracking-wider hover:bg-gray-300 focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:bg-gray-400"
        onClick={() => setIsMilkModalOpen(true)}
      >
        Add Milk
      </button>
      <a
        href="/expenses"
        className="flex flex-1 items-center justify-center rounded-sm bg-emerald-500 px-4 py-5 font-bold uppercase tracking-wider text-white hover:bg-emerald-600 focus:bg-emerald-600 focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 active:bg-emerald-700"
      >
        <div>Expenses</div>
      </a>
      {isMilkModalOpen && <MilkModal setIsMilkModalOpen={setIsMilkModalOpen} />}
    </>
  );
}
