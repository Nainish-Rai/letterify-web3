"use client";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { contract } from "@/utils/contracts";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { use, useState } from "react";

export default function CreateTOGBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState("");
  const [type, setType] = useState(1);

  console.log(type);
  const { mutate: sendTransaction, isError } = useSendTransaction();
  const call = async () => {
    const transaction = await prepareContractCall({
      contract,
      method: resolveMethod("createTOG"),
      params: [name, type],
    });
    sendTransaction(transaction);
  };

  console.log(isError);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Enter Name of your TOG"
                  placeholder="Enter Name of your TOG"
                  variant="bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <RadioGroup label="Select type of TOG" orientation="horizontal">
                  <Radio
                    onChange={(e) => setType(parseInt(e.target.value))}
                    defaultChecked
                    value="1"
                  >
                    Team
                  </Radio>
                  <Radio
                    onChange={(e) => setType(parseInt(e.target.value))}
                    value="2"
                  >
                    Group
                  </Radio>
                  <Radio
                    onChange={(e) => setType(parseInt(e.target.value))}
                    value="3"
                  >
                    Org
                  </Radio>
                </RadioGroup>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => call()}>
                  Sign in
                </Button>
                <TransactionButton
                  transaction={() =>
                    prepareContractCall({
                      contract,
                      method: resolveMethod("createTOG"),
                      params: [name, type],
                    })
                  }
                  onTransactionSent={() => console.log("Transaction Sent")}
                  onTransactionConfirmed={() =>
                    console.log("Transaction Confirmed")
                  }
                >
                  Create
                </TransactionButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
