import Image from "next/image";
import React from "react";
import { auth } from "../lib/firebase";
import { useUserContext } from "../context/UserContext";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function NavPanel({ isPanelOpen, setIsPanelOpen }) {
  const { user, router } = useUserContext();

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-screen translate-x-full bg-black/80 py-6 transition duration-300 ease-out ${
        isPanelOpen && "translate-x-0"
      }`}
    >
      <div className="flex w-full justify-end pr-6">
        <button onClick={closePanel} className="w-7">
          <Image
            src="/close.svg"
            alt="close"
            width="100%"
            height="100%"
            priority={true}
          />
        </button>
      </div>
      <div className="mt-5 flex flex-col items-center gap-2">
        <Link href="/">
          <a
            onClick={closePanel}
            className={`self-stretch bg-black/80 py-7 pr-6 text-right text-xl font-bold text-white hover:bg-black/90 focus:bg-black/90 focus:outline-none active:bg-black/100 ${
              router.route === "/" &&
              "underline decoration-white underline-offset-1"
            }`}
          >
            Home
          </a>
        </Link>
        {user && (
          <Link href="/expenses">
            <a
              onClick={closePanel}
              className={`self-stretch bg-emerald-500/80 py-7 pr-6 text-right text-xl font-bold text-white hover:bg-emerald-500/90 focus:bg-emerald-500/90 focus:outline-none active:bg-emerald-500/100 ${
                router.route === "/expenses" &&
                "underline decoration-white underline-offset-1"
              }`}
            >
              Expenses
            </a>
          </Link>
        )}
        {user && (
          <button
            className="self-stretch bg-rose-500/80 py-7 pr-6 text-right text-xl font-bold text-white hover:bg-rose-500/90 focus:bg-rose-500/90 focus:outline-none active:bg-rose-500/100"
            onClick={async () => {
              try {
                await signOut(auth);
                closePanel();
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
