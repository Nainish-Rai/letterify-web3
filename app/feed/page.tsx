"use client";
import { useReadContract } from "thirdweb/react";
import { contract } from "@/utils/contracts";
import { resolveMethod } from "thirdweb";
type Props = {};

function Feed({}: Props) {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getTOGs") as any,
    params: [],
  });
  console.log(data);
  return <div>Feed</div>;
}

export default Feed;
