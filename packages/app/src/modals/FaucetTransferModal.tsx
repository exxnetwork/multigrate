import React, { useState, useRef } from "react";
import { Close } from "@mui/icons-material";
import Modal from "../components/Modal/MainModal";
import Button from "components/Button";
import RefreshIcon from "icons/RefreshIcon";
import ArrowCircleIcon from "icons/ArrowCircle";
import { useExxfiContract } from "hooks/useContract";
import { ethers, BigNumber } from "ethers";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import SuccessImg from "/public/assets/images/success.svg";
import Image from "next/image";

interface FaucetTransferModalProps {
  isOpen: boolean;
  toggleFaucetTransferModal: () => void;
  ssnAmount: string;
}

const FaucetTransferModal = ({
  isOpen,
  ssnAmount,
  toggleFaucetTransferModal,
}: FaucetTransferModalProps) => {
  const contract = useExxfiContract();
  const [migrating, setMigrating] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { account } = useActiveWeb3React();

  const toggleIsSuccessful = () => setIsSuccessful(!isSuccessful);

  return (
    <Modal
      backgroundColor="transparent"
      isOpen={isOpen}
      onDismiss={toggleFaucetTransferModal}
      maxWidth={400}
      isFullWidth={true}
      noPadding={true}
    >
      <div className="flex justify-center items-center w-auto">
        <div className="w-full md:w-1/2 py-6 md:py-6 px-5 xl:w-[35%] bg-white dark:bg-dark4 rounded max-h-[85vh] xl:h-auto xl:max-h-[90vh] overflow-y-auto no-scrollbar">
          {!isSuccessful ? (
            <ConfirmModal
              {...{ toggleFaucetTransferModal, toggleIsSuccessful, migrating }}
            />
          ) : (
            <SuccessModal
              {...{ toggleFaucetTransferModal, toggleIsSuccessful }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FaucetTransferModal;

const SuccessModal = ({ toggleFaucetTransferModal, toggleIsSuccessful }) => {
  return (
    <>
      <div className="pb-6">
        <button onClick={toggleFaucetTransferModal} className="block ml-auto">
          <Close className="text-dark" />
        </button>
      </div>

      <div className="w-32 self-center mx-auto">
        <Image
          src={SuccessImg}
          alt="success"
          width={SuccessImg.width}
          height={SuccessImg.height}
          layout="responsive"
        />
      </div>

      <div className="text-center py-8">
        <h1 className="font-work_sans font-semibold text-base text-dark">
          Request Submited
        </h1>
        <p className="font-work_sans font-light text-base text-dark pt-4 px-6">
          The transfer is on the way. Tokens will be transferred to you within
          minutes.
        </p>
      </div>

      <button
        onClick={toggleIsSuccessful}
        className="mb-3 flex gap-x-4 justify-center items-center w-full h-14 rounded border border-[#DBD8FC50]"
      >
        <h1 className="font-work_sans font-semibold text-base text-accent">
          Go Back
        </h1>
      </button>
    </>
  );
};

const ConfirmModal = ({
  toggleFaucetTransferModal,
  toggleIsSuccessful,
  migrating,
}) => {
  return (
    <>
      <div className="flex justify-between items-center text-dark">
        <h1 className="font-work_sans font-medium text-dark1 text-opacity-60 text-lg">
          Confirm the following details
        </h1>
        <button onClick={toggleFaucetTransferModal} className="block ml-auto">
          <Close className="text-dark" />
        </button>
      </div>
      <div className="my-8 border border-[#DBD8FC] rounded p-5 space-y-6">
        <List title="Token:" value="EFT" />
        <List title="Amount:" value="0.2" />
        <List title="Network:" value="BSC Testnet" />
      </div>
      <div>
        <h1 className="font-work_sans font-medium text-lg text-dark1 text-opacity-50">
          Transfer to:
        </h1>

        <h1 className="font-work_sans font-semibold text-lg text-dark1 pt-3">
          0x7ae2f5b9e386cd1b50a
        </h1>
      </div>
      <Button
        onClick={toggleIsSuccessful}
        disabled={migrating}
        className="mt-7 gap-x-3 w-full"
      >
        <>
          <h1 className="font-work_sans font-normal text-sm lg:font-semibold lg:text-base text-white mr-3">
            {migrating ? "Processing..." : "Confirm"}
          </h1>

          {migrating && (
            <Oval height="25" width="25" color="white" ariaLabel="loading" />
          )}
        </>
      </Button>
    </>
  );
};

const List = ({ title, value }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-work_sans font-medium text-lg text-dark1 text-opacity-50">
        {title}
      </h1>

      <h1 className="font-work_sans font-medium text-lg text-dark1">{value}</h1>
    </div>
  );
};
