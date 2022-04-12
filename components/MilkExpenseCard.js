import React from "react";
import { useUserContext } from "../context/UserContext";
import { clearMilk } from "../lib/firebase";

export default function MilkExpenseCard() {
  const { milkUsers, firestoreUser } = useUserContext();

  return (
    <div className="flex flex-col gap-3 rounded bg-white p-5">
      <h2 className="relative z-10 text-2xl font-bold">
        Milk
        <div className="absolute top-[45%] left-5 -z-10 h-4 w-10 bg-gray-300"></div>
      </h2>
      <div>
        <div>
          <p className="text-lg font-medium">Personal Expense</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <p>Milk Bags: </p>
            <p className="font-bold">{firestoreUser?.milk}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p>Milk Cost: </p>
            <p className="font-bold">₹{firestoreUser?.milk * 27}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p>Extra Cost: </p>
            <p className="font-bold">₹{firestoreUser?.milkExtra}</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold">Total Cost: </p>
            <p className="font-bold">
              ₹{firestoreUser?.milk * 27 + firestoreUser?.milkExtra}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <p className="text-lg font-medium">Group Expense</p>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {milkUsers?.map((user) => (
            <div
              className="flex items-center justify-between gap-3"
              key={user.id}
            >
              <p>{user.name.split(" ")[0]}:</p>
              <p className="font-bold">₹{user.milk * 27 + user.milkExtra}</p>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3">
            <p className="font-bold">Total Cost: </p>
            <p className="font-bold">
              ₹
              {milkUsers?.reduce(
                (acc, user) => acc + user.milk * 27 + user.milkExtra,
                0
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="flex-shrink-0 rounded-sm bg-gray-700 px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
          onDoubleClick={async () => {
            try {
              await clearMilk();
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
