"use client";
import { ConnectButton, ConnectEmbed, useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { useRouter } from "next/navigation";

export default function Home() {
  const account = useActiveAccount();
  const router = useRouter();
  console.log(account);
  if (account) {
    router.push("/feed");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Letterify App</h1>

      {!account ? (
        <ConnectEmbed client={client} />
      ) : (
        <ConnectButton client={client} />
      )}
    </main>
  );
}
