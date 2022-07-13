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
  const { account } = useActiveWeb3React();

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
        <div className="w-full md:w-1/2 py-6 lg:pt-12 md:py-12 px-5 xl:w-[35%] bg-white dark:bg-dark4 rounded max-h-[85vh] xl:h-auto xl:max-h-[90vh] overflow-y-auto no-scrollbar">
          <button onClick={toggleFaucetTransferModal} className="block ml-auto">
            <Close className="text-white" />
          </button>

          <Button disabled={migrating} className="mt-7 gap-x-3 w-full">
            <>
              <h1 className="font-outfit font-normal text-sm lg:font-bold lg:text-base text-white mr-3">
                {migrating ? "Processing..." : "Confirm"}
              </h1>

              {migrating && (
                <Oval
                  height="25"
                  width="25"
                  color="white"
                  ariaLabel="loading"
                />
              )}
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FaucetTransferModal;
