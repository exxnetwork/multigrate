import React, { useState, useRef } from "react";
import { Close } from "@mui/icons-material";
import Modal from "../components/Modal/MainModal";
import Button from "components/Button";
import RefreshIcon from "icons/RefreshIcon";
import ArrowCircleIcon from "icons/ArrowCircle";
import { useExxfiContract } from "hooks/useContract";
import { ethers, BigNumber } from "ethers";

interface MigrateTokenModalProps {
  isOpen: boolean;
  toggleMigrateTokenModal: () => void;
  ssnAmount: string;
}

const MigrateTokenModal = ({
  isOpen,
  ssnAmount,
  toggleMigrateTokenModal,
}: MigrateTokenModalProps) => {
  const contract = useExxfiContract();
  const [migrating, setMigrating] = useState(false);

  console.log("CONTRACT_", contract);

  const amount = ethers.utils.parseEther(ssnAmount.toString());

  const migrateTokenHandler = async () => {
    setMigrating(true);
    try {
      const res = await contract.exchange({
        value: amount,
        gasLimit: 200000,
      });

      console.log("migrate res", res);

      setMigrating(false);
      toggleMigrateTokenModal();
    } catch (error) {
      console.error("migrate err", error);
      setMigrating(false);
    }
  };

  return (
    <Modal
      backgroundColor="transparent"
      isOpen={isOpen}
      onDismiss={toggleMigrateTokenModal}
      maxWidth={400}
      isFullWidth={true}
      noPadding={true}
    >
      <div className="flex justify-center items-center w-auto">
        <div className="w-full md:w-1/2 py-6 lg:pt-12 md:py-12 px-5 md:px-10 xl:w-[40%] bg-white dark:bg-dark4 rounded-2xl max-h-[85vh] xl:h-auto xl:max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="w-28 h-28 lg:w-40 lg:h-40 rounded-full bg-lightGreen dark:bg-dark3 mx-auto"></div>
          <h1 className="font-outfit font-semibold text-base lg:text-xl text-center text-dark dark:text-grey mt-3 lg:my-5">
            You are about to migrate
          </h1>

          <div className="flex items-center gap-x-3 lg:gap-x-8 justify-between mt-10">
            <DisplayExchangeAmount amount={`${ssnAmount} SSN`} />
            <div className="text-black dark:text-grey">
              <ArrowCircleIcon />
            </div>
            <DisplayExchangeAmount amount={`${ssnAmount} WSSN`} />
          </div>

          <Button
            disabled={migrating}
            onClick={migrateTokenHandler}
            className="mt-7 gap-x-3 w-full"
          >
            <>
              <h1 className="font-outfit font-normal text-sm lg:font-bold lg:text-base text-white">
                {migrating ? "Migrating..." : "Migrate"}
              </h1>

              <RefreshIcon />
            </>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MigrateTokenModal;

const DisplayExchangeAmount = ({ amount }: { amount: string }) => {
  return (
    <div className="flex-1 h-14 rounded-2xl bg-accent1 dark:bg-dark3 flex justify-center items-center">
      <h1 className="font-outfit font-medium text-sm lg:text-xl text-center text-dark dark:text-grey">
        {amount}
      </h1>
    </div>
  );
};
