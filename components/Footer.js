import { signOut } from "firebase/auth";
import React from "react";
import { useUserContext } from "../context/UserContext";
import { auth } from "../lib/firebase";

export default function Footer() {
  const { user, router } = useUserContext();

  return (
    <div className="flex justify-between bg-gray-200 p-6">
      <a href="/" className="flex justify-start gap-[2px]">
        <h4 className="text-lg">Dink</h4>
        <span className="text-[0.5rem]">TM</span>
      </a>
      <div className="flex flex-col items-end gap-2 text-right text-sm">
        {user && (
          <a
            href="/expenses"
            className="underline decoration-emerald-500 underline-offset-2"
          >
            Expenses
          </a>
        )}
        {user && (
          <button
            className="underline decoration-rose-500 underline-offset-2"
            onClick={async () => {
              try {
                await signOut(auth);
                router.push("/login");
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
