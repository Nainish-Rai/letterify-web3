import React from "react";
import { Card, CardFooter, Image, Button, CardHeader } from "@nextui-org/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

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
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-3"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/90 uppercase font-bold">
          {memberLimit == 5 && "Team"}
          {memberLimit == 10 && "Group"}
          {memberLimit == 20 && "Organization"}
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
          <p className="text-gray-200 text-tiny">{admin}</p>
        </div>
        <Button
          onClick={() => console.log(memberList)}
          className="text-tiny"
          color="primary"
          radius="full"
          size="sm"
        >
          {memberList != undefined && memberList.length < memberLimit
            ? "Join"
            : memberList == undefined
            ? "Join"
            : "Full"}
        </Button>
      </CardFooter>
    </Card>
  );
}
