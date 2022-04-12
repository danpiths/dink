import Head from "next/head";
import { useUserContext } from "../context/UserContext";
import { signInWithGoogle } from "../lib/firebase";

export default function Login() {
  const { setIsLoading, router } = useUserContext();

  return (
    <div className="flex flex-1 items-center">
      <Head>
        <title>Login | Dink</title>
      </Head>
      <div className="flex flex-1 flex-col items-center gap-5">
        <h1 className="text-center text-4xl font-bold">Log In</h1>
        <button
          className="rounded-sm border-2 border-gray-800 px-12 py-2 text-xl font-bold uppercase tracking-wider hover:bg-gray-100 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-200"
          onClick={async () => {
            try {
              setIsLoading(true);
              await signInWithGoogle();
              router.push("/");
            } catch (err) {
              console.log(err.message);
            }
          }}
        >
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-amber-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-600">l</span>
          <span className="text-red-500">e</span>
        </button>
      </div>
    </div>
  );
}
