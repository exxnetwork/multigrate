import Image from "next/image";
import React, { useState } from "react";

import Button from "components/Button";
import MetaMaskImg from "/public/assets/images/metamask.svg";
import LightModeLogo from "/public/assets/images/logo.svg";
import DarkModeLogo from "/public/assets/images/dark-mode-logo.svg";
import HamburgerMenuIcon from "icons/HamburgerMenu";
import MobileMenuModal from "modals/MobileMenuModal";
import ModeEclipse from "icons/ModeEclipse";
import useDarkMode from "hooks/useDarkMode";
import Web3Status from "components/Web3Status";
import { useWalletModalToggle } from "state/application/hooks";
import { shortenAddress } from "functions/format";
import useActiveWeb3React from "hooks/useActiveWeb3React";
interface MainPanelProps {
  pageTitle: string;
  subTitle: string;
  children: JSX.Element;
}

const MainPanel = ({ pageTitle, subTitle, children }: MainPanelProps) => {
  const { account } = useActiveWeb3React();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const toggleDisconnectModal = () => setDisconnect(!disconnect);
  const toggleMobileMenuModal = () => setIsOpen(!isOpen);

  console.log("CONFIRM+_", disconnect, account);

  return (
    <>
      <div className="bg-accent1 dark:bg-dark3 flex-1 lg:h-screen overflow-y-auto overflow-x-hidden">
        <div className="flex lg:hidden justify-between items-center px-5 pt-8">
          <div className="w-20">
            {isDarkMode ? (
              <Image
                src={DarkModeLogo}
                alt="Exxfi migrator"
                width={DarkModeLogo.width}
                height={DarkModeLogo.height}
                layout="responsive"
              />
            ) : (
              <Image
                src={LightModeLogo}
                alt="Exxfi migrator"
                width={LightModeLogo.width}
                height={LightModeLogo.height}
                layout="responsive"
              />
            )}
          </div>

          <button
            onClick={toggleMobileMenuModal}
            className="text-black dark:text-white"
          >
            <HamburgerMenuIcon />
          </button>
        </div>
        <div className="py-10 lg:pt-14 pb-8 px-5 lg:px-10 flex justify-between items-center ">
          <div>
            <h1 className="font-outfit font-bold text-lg lg:text-xl text-dark dark:text-grey">
              {pageTitle}
            </h1>
            <h1 className="font-outfit font-normal text-sm text-dark1 dark:text-white mt-2 lg:mt-4">
              {subTitle}
            </h1>
          </div>
          <div className="relative">
            <Web3Status
              title="Connect Wallet"
              toggleDisconnectModal={toggleDisconnectModal}
            />
            {disconnect && account && (
              <DisconnectButton isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
        <main className="px-5 pb-40 lg:pb-0 lg:px-10 h-auto">{children}</main>

        <ExtraMobileMenu
          {...{ toggleDarkMode, isDarkMode, disconnect, toggleDisconnectModal }}
        />
      </div>
      <MobileMenuModal {...{ isOpen, toggleMobileMenuModal }} />
    </>
  );
};

export default MainPanel;

const DisconnectButton = ({ isDarkMode }) => {
  const { connector } = useActiveWeb3React();
  return (
    <div className="px-5 lg:w-fit absolute -top-10 lg:right-0 lg:top-20 z-50">
      <button
        onClick={() => connector.deactivate()}
        className={`${
          isDarkMode ? "bg-[#F8F8F8]" : "bg-dark"
        } rounded-lg px-10 h-14`}
      >
        <h1
          className={`font-outfit font-medium text-base  ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          Disconnect Wallet
        </h1>
      </button>
    </div>
  );
};

const ExtraMobileMenu = ({
  toggleDarkMode,
  isDarkMode,
  disconnect,
  toggleDisconnectModal,
}) => {
  const toggleWalletModal = useWalletModalToggle();
  const { library, accounts, account, connector, chainId } =
    useActiveWeb3React();

  return (
    <div className="relative">
      <div className="py-5 bg-white dark:bg-dark2 fixed bottom-0 left-0 w-full flex lg:hidden items-center justify-between gap-x-7 px-5">
        <div
          onClick={toggleDarkMode}
          className={`w-14 h-14 flex flex-col justify-center rounded-full transition-all delay-75 ease-in-out ${
            isDarkMode ? "bg-grey1" : "bg-grey5"
          }`}
        >
          <div
            className={`transition-all delay-150 ease-linear ${
              isDarkMode
                ? "translate-x-8 text-grey5"
                : "translate-x-2 text-white"
            }`}
          >
            <ModeEclipse isDarkMode={isDarkMode} className="w-4 h-8" />
          </div>
        </div>

        <Button
          onClick={() => {
            account ? toggleDisconnectModal() : toggleWalletModal();
          }}
          className="flex justify-between flex-1 px-3"
        >
          <>
            <div className="w-14">
              <Image
                src={MetaMaskImg.src}
                alt="metamask"
                width={MetaMaskImg.width}
                height={MetaMaskImg.height}
                layout="responsive"
              />
            </div>
            <h1 className="flex-1 font-outfit font-bold text-base text-white">
              {account ? `${shortenAddress(account)}` : "Connect Wallet"}
            </h1>
          </>
        </Button>
      </div>
      {disconnect && account && <DisconnectButton isDarkMode={isDarkMode} />}
    </div>
  );
};
