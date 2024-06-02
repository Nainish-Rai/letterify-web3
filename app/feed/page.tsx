"use client";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { Spinner } from "@nextui-org/spinner";
import { contract } from "@/utils/contracts";
import { prepareContractCall, readContract, resolveMethod } from "thirdweb";
import TOGCard from "@/components/TOGCard";
import { client } from "../client";
import CreateTOGBtn from "@/components/CreateTOGBtn";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
type Props = {};

function Feed({}: Props) {
  const account = useActiveAccount();
  const [applicationArr, setApplicationArr] = useState<any>([]);
  console.log(applicationArr, "app arr");
  // console.log(account);
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getTOGs") as any,
    params: [],
  });
  console.log(data);
  const { data: userTogs, isLoading: isLoading2 } = useReadContract({
    contract,
    method: resolveMethod("getUserTOGs") as any,
    params: [account?.address as string],
  });

  const ArrOfIndexOfTogsUserIsAdmin =
    !isLoading &&
    data.map((item: TOG, i: number) => item.admin === account?.address && i);

  console.log(ArrOfIndexOfTogsUserIsAdmin);
  async function getTogApplications(index: number) {
    const data = await readContract({
      contract,
      method: resolveMethod("togApplications") as any,
      params: [index, 0],
    });
    const data2 = {
      index: index,
      data: data,
    };
    setApplicationArr((prev: any[]) => [...prev, data2]);
  }
  function CallApplications() {
    for (let i = 0; i < ArrOfIndexOfTogsUserIsAdmin.length; i++) {
      ArrOfIndexOfTogsUserIsAdmin[i] &&
        getTogApplications(ArrOfIndexOfTogsUserIsAdmin[i]);
    }
  }

  if (isLoading)
    return (
      <div className="w-full h-screen justify-center items-center flex">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full">
      <Toaster />

      <div className="flex w-full items-center justify-between gap-12 px-4 py-2">
        <CreateTOGBtn />
        <div>
          <ConnectButton client={client} />
        </div>
      </div>
      <div className="mt-16">
        <h2
          className=" font-semibold cursor-pointer hover:opacity-70 duration-200 text-4xl pl-4  "
          onClick={CallApplications}
        >
          Show Applications
        </h2>
        {applicationArr.length > 0 && (
          <div className="px-4 mt-4">
            {applicationArr.map((item: any, i: number) => (
              <div
                key={i}
                className="w-full rounded-lg  my-1 items-center bg-neutral-900 p-2 px-4 flex justify-between"
              >
                <p>{item.data}</p>
                <p className="text-lg text-gray-300 px-4">
                  {data[item.index].name}
                </p>
                <TransactionButton
                  className=""
                  transaction={() =>
                    prepareContractCall({
                      contract,
                      method: resolveMethod("approveApplication"),
                      params: [item.index, item.data],
                    })
                  }
                  onTransactionSent={() => toast.success("Transaction Sent")}
                  onTransactionConfirmed={() => (
                    toast.success("Transaction Confirmed"),
                    applicationArr.splice(i, 1)
                  )}
                >
                  Approve
                </TransactionButton>
              </div>
            ))}
          </div>
        )}
      </div>
      {!isLoading2 && userTogs != undefined && (
        <div className="mt-16">
          <h2 className=" font-semibold text-4xl pl-4 ">Your TOGs</h2>
          <div className="grid grid-cols-12">
            {userTogs.map((item: any, i: number) => (
              <TOGCard
                key={i}
                {...data[item]}
                index={i}
                image={`/group${Math.floor(Math.random() * 4) + 1}.webp`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-16">
        <h2 className=" font-semibold text-4xl pl-4 ">Explore TOGs</h2>
        <div className="grid grid-cols-12">
          {data.map((item: TOG, i: number) => (
            <TOGCard
              key={i}
              {...item}
              index={i}
              image={`/group${Math.floor(Math.random() * 4) + 1}.webp`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
