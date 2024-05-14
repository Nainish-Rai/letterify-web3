"use client";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { contract } from "@/utils/contracts";
import { resolveMethod } from "thirdweb";
import TOGCard from "@/components/TOGCard";
import { client } from "../client";
import CreateTOGBtn from "@/components/CreateTOGBtn";
type Props = {};

function Feed({}: Props) {
  const account = useActiveAccount();
  console.log(account);
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getTOGs") as any,
    params: [],
  });
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <CreateTOGBtn />
      <ConnectButton client={client} />
      <div className="grid grid-cols-12">
        {data.map((item: TOG, i: number) => (
          <TOGCard key={i} {...item} index={i} image="/team3.webp" />
        ))}
      </div>
    </div>
  );
}

export default Feed;
