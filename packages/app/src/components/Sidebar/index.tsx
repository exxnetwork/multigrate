import NavLink from "components/NavLink";
import BridgeIcon from "icons/BridgeIcon";
import FaqIcon from "icons/FaqIcon";
import HelpIcon from "icons/HelpIcon";
import MigratorIcon from "icons/MigratorIcon";
import ModeEclipse from "icons/ModeEclipse";
import ContactModal from "modals/ContactModal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import LightModeLogo from "/public/assets/images/logo.svg";
import DarkModeLogo from "/public/assets/images/dark-mode-logo.svg";
import useDarkMode from "hooks/useDarkMode";
import FaucetIcon from "icons/FaucetIcon";

const Sidebar = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleContactModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="hidden lg:block w-[25%] xl:w-[20%] relative h-screen overflow-x-hidden overflow-y-auto bg-white dark:bg-dark2">
        <Link href="/migrator" passHref>
          <div className="px-12 pt-16">
            <div className="w-28">
              {isDarkMode ? (
                <Image
                  src={DarkModeLogo}
                  alt="Exxfi Migrator"
                  width={DarkModeLogo.width}
                  height={DarkModeLogo.height}
                  layout="responsive"
                />
              ) : (
                <Image
                  src={LightModeLogo}
                  alt="Exxfi Migrator"
                  width={LightModeLogo.width}
                  height={LightModeLogo.height}
                  layout="responsive"
                />
              )}
            </div>
          </div>
        </Link>

        <div className="pt-14 space-y-4">
          <NavLink label="Migrator" href="/migrator" icon={<MigratorIcon />} />
          <NavLink
            label="Faucet"
            href="/faucet"
            icon={<FaucetIcon />}
            className="py-[10px]"
          />
          <NavLink
            label="Token Bridge"
            href="/token_bridge"
            icon={<HelpIcon />}
          />
          <NavLink label="FAQ" href="/faq" icon={<FaqIcon />} />
          <NavLink
            label="Help"
            button={true}
            onClick={toggleContactModal}
            icon={<HelpIcon />}
          />
        </div>

        <div className="flex gap-x-3 py-5 px-12 items-center absolute left-0 bottom-10 bg-transparent">
          <button
            onClick={() => {
              typeof toggleDarkMode === "function" && toggleDarkMode();
            }}
            className={`w-10 h-10 rounded-full transition-all delay-75 ease-in-out ${
              isDarkMode ? "bg-grey1" : "bg-grey5"
            }`}
          >
            <div
              className={`transition-all delay-150 ease-linear ${
                isDarkMode
                  ? "translate-x-6 text-grey5"
                  : "translate-x-2 text-white"
              }`}
            >
              <ModeEclipse isDarkMode={isDarkMode} />
            </div>
          </button>
          <h1 className="font-medium font-outfit text-base text-grey6">
            {isDarkMode ? "Dark" : "Light"} Mode
          </h1>
        </div>
      </div>

      <ContactModal {...{ isOpen, toggleContactModal }} />
    </>
  );
};

export default Sidebar;
