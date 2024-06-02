"use client";
import React from "react";
import { Card, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { contract } from "@/utils/contracts";
import WriteLetterBtn from "./WriteLetterBtn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TOGCard({
  image,
  name,
  memberLimit,
  admin,
  memberList,
  index,
}: {
  index: number;
  image: string;
  name: string;
  memberLimit: number;
  admin: string;
  memberList: string[];
}) {
  console.log(memberList);
  const router = useRouter();
  return (
    <div className="h-[300px] my-2 col-span-12 w-full p-4 sm:col-span-3">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-3"
      >
        <CardHeader
          onClick={() => {
            router.push(`/TOG/${index}`);
          }}
          className="absolute cursor-pointer z-10 top-1 flex-col items-start"
        >
          <p className="text-tiny text-white/90 uppercase font-bold">
            {memberLimit == 5 && "Team"}
            {memberLimit == 10 && "Group"}
            {memberLimit == 15 && "Organization"}
          </p>
          <h4 className="text-white font-medium text-2xl">{name}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full  brightness-75  object-cover"
          src={image}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-gray-200 text-tiny">Admin</p>
            <p className="text-gray-200 text-tiny">
              {admin.slice(0, 6)}...{admin.slice(-4)}
            </p>
          </div>
          <WriteLetterBtn togIndex={index} />
          <TransactionButton
            className="text-tiny w-6 px-1"
            transaction={() =>
              prepareContractCall({
                contract,
                method: resolveMethod("applyToJoinTOG"),
                params: [index],
              })
            }
            onTransactionSent={() => toast.success("Transaction Sent")}
            onTransactionConfirmed={() =>
              toast.success("Transaction Confirmed")
            }
          >
            {memberList != undefined && memberList.length < memberLimit
              ? "Join"
              : memberList == undefined
              ? "Join"
              : "Full"}
          </TransactionButton>
        </CardFooter>
      </Card>
    </div>
  );
}
