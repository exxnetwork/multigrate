import React, { useState } from "react";

import DashboardLayout from "Layout/DashboardLayout";
import TelegramImg from "/public/assets/images/telegram.svg";
import Image from "next/image";
import FaucetTransferModal from "modals/FaucetTransferModal";
import EFT from "components/faucet/EFT";
import Exx from "components/faucet/EXX";
import TestBalanceTable from "components/faucet/TestBalanceTable";

const Faucet = () => {
  const [activeTab, setActiveTab] = useState<string>("EFT");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [ssnAmount, setSsnAmount] = useState("");

  const toggleFaucetTransferModal = () => setIsOpen(!isOpen);

  return (
    <DashboardLayout
      pageTitle="Faucet"
      subTitle="Exxfi ecosystem testnet tokens"
      isEXX={activeTab === "EXX"}
    >
      <>
        <div className="lg:py-12 w-full">
          <div className="pb-10">
            <h1 className="font-bold font-work_sans text-lg text-dark dark:text-grey text-opacity-50">
              Get Test Tokens
            </h1>
            <h1 className="font-normal font-work_sans text-sm text-dark1 dark:text-grey text-opacity-50 pt-2 lg:pt-3 lg:w-[35%]">
              This faucet transfers TestToken on Matic testnets and parent
              chain. Confirm details before submitting.
            </h1>
          </div>
          <div className="lg:flex gap-x-14 space-y-10 lg:space-y-0">
            <div className="lg:w-1/2 bg-grey dark:bg-dark2 dark:bg-opacity-40 rounded border border-[#DBD8FC] overflow-hidden py-4 px-4">
              <div className="bg-lightGreen dark:bg-dark3 flex shadow-migrator h-16 p-2 rounded-2xl">
                <TabButton title="EFT" {...{ setActiveTab, activeTab }} />
                <TabButton title="EXX" {...{ setActiveTab, activeTab }} />
              </div>

              <div className="pt-7 overflow-hidden">
                <EFT
                  isActive={activeTab === "EFT"}
                  toggleFaucetTransferModal={toggleFaucetTransferModal}
                  {...{ setSsnAmount, ssnAmount }}
                />
                <Exx
                  isActive={activeTab === "EXX"}
                  toggleFaucetTransferModal={toggleFaucetTransferModal}
                  {...{ setSsnAmount, ssnAmount }}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h1 className="font-work_sans font-semibold text-base text-dark1 dark:text-grey text-opacity-50 pb-4">
                Test Balances
              </h1>
              <TestBalanceTable />
            </div>
          </div>
        </div>

        <button
          onClick={() => window.open("https://t.me/exxfi", "_blank")}
          className="bg-[#F8F8F8] rounded-full px-6 h-16 hidden lg:flex gap-x-3 items-center my-10 ml-auto"
        >
          <div className="w-8 lg:w-10 self-center">
            <Image
              src={TelegramImg}
              alt="telegram"
              width={TelegramImg.width}
              height={TelegramImg.height}
              layout="responsive"
            />
          </div>
          <h1 className="font-outfit font-medium text-base text-black">
            Join our community now!
          </h1>
        </button>

        <FaucetTransferModal
          {...{ isOpen, toggleFaucetTransferModal, ssnAmount }}
        />
      </>
    </DashboardLayout>
  );
};

export default Faucet;

interface TabButtonProps {
  title: string;
  activeTab: string;
  setActiveTab: (val: string) => void;
}

const TabButton = ({ title, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = title.toLowerCase() === activeTab.toLowerCase();

  return (
    <button
      onClick={() => setActiveTab(title)}
      className={`w-1/2 h-full ${
        isActive ? " bg-white dark:bg-[#1E322E]" : "bg-transparent"
      } rounded-2xl flex justify-center items-center transition-all ease-linear delay-75`}
    >
      <h1
        className={`font-work_sans font-semibold text-sm text-dark ${
          isActive
            ? "text-opacity-100 dark:text-grey dark:text-opacity-100"
            : "text-opacity-70 dark:text-white dark:text-opacity-100"
        }`}
      >
        {title}
      </h1>
    </button>
  );
};
