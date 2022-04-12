import React from "react";
import { useUserContext } from "../context/UserContext";
import { clearDinner } from "../lib/firebase";

export default function DinnerExpenseCard() {
  const { firestoreUser } = useUserContext();

  return (
    <div className="flex flex-col gap-3 rounded bg-white p-5">
      <h2 className="relative z-10 text-2xl font-bold">
        Dinner
        <div className="absolute top-[45%] left-5 -z-10 h-4 w-16 bg-gray-300"></div>
      </h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p>Total Times Eaten:</p>
          <p className="font-bold">{firestoreUser?.dinner}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-bold">Total Cost:</p>
          <p className="font-bold">₹{firestoreUser?.dinner * 70}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex-shrink-0 rounded-sm bg-gray-700 px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
          onDoubleClick={async () => {
            try {
              await clearDinner();
            } catch (err) {
              console.log(err.message);
            }
          }}
        >
          Clear Expenses
        </button>
        <p className="text-xs text-rose-500">
          DOUBLE CLICK the button to erase all expenses.
        </p>
      </div>
    </div>
  );
}
