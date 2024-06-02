"use client";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { TransactionButton, useSendTransaction } from "thirdweb/react";
import { contract } from "@/utils/contracts";
import { Textarea } from "@nextui-org/input";
import toast from "react-hot-toast";

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

export default function WriteLetterBtn({ togIndex }: { togIndex: number }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reciever, setReciever] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: sendTransaction, isError } = useSendTransaction();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Write
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Write Letter
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Enter Reciever's Addresss"
                  placeholder="Enter Reciever's Addresss"
                  variant="bordered"
                  value={reciever}
                  onChange={(e) => setReciever(e.target.value)}
                />
                <Textarea
                  label="Description"
                  placeholder="Enter your description"
                  className="max-w-xs"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>

                <TransactionButton
                  disabled={
                    description.length > 200 ||
                    reciever.length == 0 ||
                    description.length == 0
                  }
                  transaction={() =>
                    prepareContractCall({
                      contract,
                      method: resolveMethod("writeLetter"),
                      params: [togIndex, reciever, description],
                    })
                  }
                  onTransactionSent={() => toast.success("Transaction Sent")}
                  onTransactionConfirmed={() =>
                    toast.success("Transaction Confirmed") && onClose()
                  }
                >
                  Write Letter
                </TransactionButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
