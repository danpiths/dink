import Head from "next/head";
import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import { useUserContext } from "../context/UserContext";
import { addUserGroup } from "../lib/firebase";

export default function RegsiterGroup() {
  const { user, isLoading, router } = useUserContext();
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex flex-1 flex-col gap-3 p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <Head>
          <title>Add Group | Dink</title>
        </Head>
        <p>Enter your group in order to continue :)</p>
        <div className="flex flex-col items-center justify-center gap-2">
          <FormInput
            label="Group"
            for="gid"
            value={groupId}
            type="text"
            onChange={setGroupId}
          />
          <button
            className="self-stretch rounded-sm bg-gray-700 px-4 py-3 text-white hover:bg-gray-800 focus:bg-gray-800 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 active:bg-gray-900"
            onClick={async () => {
              try {
                await addUserGroup(groupId);
                router.push("/");
              } catch (err) {
                console.log(err.message);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
