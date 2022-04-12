import Image from "next/image";
import { useState, useEffect } from "react";
import { addMilk } from "../lib/firebase";
import FormInput from "./FormInput";

export default function MilkModal({ setIsMilkModalOpen }) {
  const [milk, setMilk] = useState("");
  const [extra, setExtra] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    milk && extra && setError(false);
  }, [milk, extra]);

  return (
    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/40">
      <div className="relative flex flex-col items-center gap-5 rounded bg-white p-5">
        <button
          onClick={() => {
            setIsMilkModalOpen(false);
          }}
          className="absolute right-3 top-3 w-6"
        >
          <Image
            src="/close-dark.svg"
            alt="close"
            width="100%"
            height="100%"
            priority={true}
          />
        </button>
        <h1 className="mt-3 text-2xl font-bold">Add Milk</h1>
        <div className="flex flex-col items-center gap-4">
          <FormInput
            label="Milk Bags"
            for="milk"
            type="number"
            value={milk}
            onChange={setMilk}
          />
          <FormInput
            label="Extra"
            for="extra"
            type="number"
            value={extra}
            onChange={setExtra}
          />
          <button
            className="self-stretch rounded-sm bg-gray-700 px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
            onClick={async () => {
              try {
                if (milk || extra) {
                  if (!extra) {
                    setExtra(0);
                  }
                  if (!milk) {
                    setMilk(0);
                  }
                  await addMilk(parseInt(milk), parseInt(extra));
                  setMilk("");
                  setExtra("");
                  setIsMilkModalOpen(false);
                } else {
                  setError(true);
                }
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Submit
          </button>
          {error && (
            <p className="text-sm text-rose-500">
              Either of the fields should be filled.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
