import React from "react";
import { useState } from "react";
import NavPanel from "./NavPanel";
import Image from "next/image";

export default function Header() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 pt-6">
      <a href="/" className="flex items-center gap-1">
        <div className="w-7">
          <Image
            src="/milk.svg"
            alt="logo"
            width="100%"
            height="100%"
            priority={true}
          />
        </div>
        <h2 className="text-center text-lg font-bold leading-none">Dink</h2>
      </a>
      <button
        onClick={() => {
          setIsPanelOpen(true);
        }}
      >
        <div className="w-7">
          <Image
            src="/menu.svg"
            alt="menu"
            width="100%"
            height="100%"
            priority={true}
          />
        </div>
      </button>
      <NavPanel isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
    </header>
  );
}
