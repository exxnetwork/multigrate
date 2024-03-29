import React, { useState } from "react";

import DashboardLayout from "Layout/DashboardLayout";
import TelegramImg from "/public/assets/images/telegram.svg";
import Image from "next/image";
import MigrateTokenModal from "modals/MigrateTokenModal";
import WrappedSSN from "components/migrator/WrappedSSN";
import ExxFiMigration from "components/migrator/ExxfiMigration";
import WHSN from "components/migrator/WHSN";
import MigrateHSNModal from "modals/MigrateHSNModal";

const Migrator = () => {
  const [activeTab, setActiveTab] = useState<string>("WSSN");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMigrateHSN, setIsMigrateHSN] = useState<boolean>(false);

  const [ssnAmount, setSsnAmount] = useState("");
  const [hypersonicAmount, setHypersonicAmount] = useState("");

  const toggleMigrateTokenModal = () => setIsOpen(!isOpen);
  const toggleMigrateHSNModal = () => setIsMigrateHSN(!isMigrateHSN);

  return (
    <DashboardLayout
      pageTitle="Multigrate"
      subTitle="Exxfi ecosystem multi-channel migration system"
    >
      <>
        <div className="lg:py-12 w-full flex justify-center">
          <div className="w-full lg:w-3/4 xl:w-1/2 bg-white dark:bg-dark1 dark:bg-opacity-40 py-4 lg:py-10 px-4 lg:px-7 rounded-2xl">
            <div className="bg-lightGreen dark:bg-dark3 flex shadow-migrator h-16 p-2 rounded-2xl">
              <TabButton title="WSSN" {...{ setActiveTab, activeTab }} />
              <TabButton title="WHSN" {...{ setActiveTab, activeTab }} />
              <TabButton title="EFT" {...{ setActiveTab, activeTab }} />
            </div>

            <div className="pt-5 overflow-hidden">
              <WrappedSSN
                isActive={activeTab === "WSSN"}
                toggleMigrateTokenModal={toggleMigrateTokenModal}
                {...{ setSsnAmount, ssnAmount }}
              />
              <WHSN
                isActive={activeTab === "WHSN"}
                toggleMigrateHSNModal={toggleMigrateHSNModal}
                {...{ setHypersonicAmount, hypersonicAmount }}
              />
              <ExxFiMigration
                isActive={activeTab === "EFT"}
                toggleMigrateTokenModal={toggleMigrateTokenModal}
              />
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

        <MigrateTokenModal
          {...{ isOpen, toggleMigrateTokenModal, ssnAmount }}
        />

        <MigrateHSNModal
          {...{ isOpen: isMigrateHSN, toggleMigrateHSNModal, hypersonicAmount }}
        />
      </>
    </DashboardLayout>
  );
};

export default Migrator;

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
