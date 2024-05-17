"use client";
import { client } from "@/app/client";
import { contract } from "@/utils/contracts";
import { Spinner } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { resolveMethod } from "thirdweb";
import { Code } from "@nextui-org/react";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

type Props = {};

function TogDetails({}: Props) {
  const router = useRouter();
  const account = useActiveAccount();
  const params = useParams();
  const { data: letters, isLoading: isLoading } = useReadContract({
    contract,
    method: resolveMethod("getTOGLetters") as any,
    params: [parseInt(params?.index as string)],
  });
  console.log(letters);
  console.log(params);
  // console.log(letters.map((letter: any) => letter.to));
  console.log(account?.address, "acc");
  if (isLoading)
    return (
      <div className="w-full h-screen justify-center items-center flex">
        <Spinner />
      </div>
    );
  return (
    <div className="mx-6 py-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-3xl">TOG Details</h1>
        <div
          className="cursor-pointer text-purple-500 hover:text-purple-700 duration-200"
          onClick={() => router.push("/feed")}
        >
          Back to Feed
        </div>
        <div>
          <ConnectButton client={client} />
        </div>
      </div>
      <h1 className="font-semibold text-3xl mt-6">All Letters</h1>
      <div className="mt-6">
        {letters.map((letter: any, i: number) => (
          <div className="bg-neutral-800 p-2 px-4 rounded-xl" key={i}>
            {" "}
            <p className="flex gap-2">
              {i + 1}:{" "}
              <div className=" p-2 bg-slate-900 text-white font-medium rounded-md">
                {" "}
                {letter.description}
              </div>
            </p>{" "}
            <div>
              From{" "}
              <span className="text-sm text-gray-400 opacity-90">
                {letter.from}
              </span>
              {"  "}
              To{" "}
              <span className="text-sm text-gray-400 opacity-90">
                {letter.to}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h1 className="font-semibold text-3xl mt-6">Recieved Letters</h1>
      <div className="mt-4">
        {letters.map(
          (letter: any, i: number) =>
            letter.to == account?.address && (
              <div className="bg-neutral-800 p-2 px-4 rounded-xl" key={i}>
                {" "}
                <p className="flex gap-2">
                  {i + 1}:{" "}
                  <div className=" p-2 bg-slate-900 text-white font-medium rounded-md">
                    {" "}
                    {letter.description}
                  </div>
                </p>{" "}
                <div>
                  From{" "}
                  <span className="text-sm text-gray-400 opacity-90">
                    {letter.from}
                  </span>
                  {"  "}
                  {/* To{" "}
              <span className="text-sm text-gray-400 opacity-90">
                {letter.to}
              </span> */}
                </div>
              </div>
            )
        )}
      </div>
      <h1 className="font-semibold text-3xl mt-6">Sent Letters</h1>
      <div className="mt-4">
        {letters.map(
          (letter: any, i: number) =>
            letter.from == account?.address && (
              <div className="bg-neutral-800 p-2 px-4 rounded-xl" key={i}>
                {" "}
                <p className="flex gap-2">
                  {i + 1}:{" "}
                  <div className=" p-2 bg-slate-900 text-white font-medium rounded-md">
                    {" "}
                    {letter.description}
                  </div>
                </p>{" "}
                <div>
                  From{" "}
                  <span className="text-sm text-gray-400 opacity-90">
                    {letter.to}
                  </span>
                  {"  "}
                  {/* To{" "}
              <span className="text-sm text-gray-400 opacity-90">
                {letter.to}
              </span> */}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default TogDetails;
