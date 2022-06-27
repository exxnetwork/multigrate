import React, { useState, useRef } from "react";
import { Close } from "@mui/icons-material";
import Modal from "../components/Modal/MainModal";
import Button from "components/Button";
import RefreshIcon from "icons/RefreshIcon";
import ArrowCircleIcon from "icons/ArrowCircle";
import { useRouter } from "next/router";
import MigratorIcon from "icons/MigratorIcon";
import HelpIcon from "icons/HelpIcon";
import FaqIcon from "icons/FaqIcon";
import ContactModal from "./ContactModal";

interface MobileMenuModalProps {
  isOpen: boolean;
  toggleMobileMenuModal: () => void;
}

const MobileMenuModal = ({
  isOpen,
  toggleMobileMenuModal,
}: MobileMenuModalProps) => {
  const [isContactModal, setIsContactModal] = useState<boolean>(false);

  const toggleContactModal = () => setIsContactModal(!isContactModal);

  return (
    <>
      <Modal
        backgroundColor="transparent"
        isOpen={isOpen}
        onDismiss={toggleMobileMenuModal}
        maxWidth={400}
        isFullWidth={true}
        noPadding={true}
        isMax={true}
      >
        <div className="flex justify-center items-end lg:items-center w-full h-full px-4 pb-16">
          <div className="w-full md:w-1/2 py-6 lg:pt-12 md:py-12 px-5 md:px-10 xl:w-[40%] bg-accent1 dark:bg-dark4 rounded-2xl max-h-[82vh] xl:h-auto xl:max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center">
              <h1 className="font-outfit font-semibold text-base text-dark dark:text-grey">
                Menu
              </h1>
              <button onClick={toggleMobileMenuModal}>
                <Close className="text-dark dark:text-grey" />
              </button>
            </div>

            <div className="pt-8 space-y-4">
              <MobileNavLink
                label="Migrator"
                href="/migrator"
                icon={<MigratorIcon />}
              />
              <MobileNavLink
                label="Token Bridge"
                href="/token_bridge"
                icon={<HelpIcon />}
              />
              <MobileNavLink label="FAQ" href="/faq" icon={<FaqIcon />} />
              <MobileNavLink
                label="Help"
                button={true}
                onClick={() => {
                  toggleMobileMenuModal();
                  setTimeout(() => toggleContactModal(), 200);
                }}
                icon={<HelpIcon />}
              />
            </div>
          </div>
        </div>
      </Modal>

      <ContactModal {...{ isOpen: isContactModal, toggleContactModal }} />
    </>
  );
};

export default MobileMenuModal;

interface MobileNavlinkProps {
  icon: JSX.Element;
  label: string;
  href?: string;
  exact?: boolean;
  pathname?: string;
  className?: string;
  button?: boolean;
  link?: boolean;
  onClick?: () => void;
}

const MobileNavLink = ({
  icon,
  label,
  exact = false,
  pathname,
  href,
  button = false,
  className,
  onClick,
}: MobileNavlinkProps) => {
  const { asPath, push } = useRouter();

  const isActive = exact
    ? (pathname || href) === asPath
    : asPath.startsWith(pathname || href);

  return (
    <div
      onClick={() => {
        button ? onClick() : push(href || "/");
      }}
      className={`cursor-pointer flex justify-between items-center bg-grey dark:bg-[#02061D33] rounded-[10px] px-2 py-3 shadow-faq font-outfit font-semibold text-base text-dark1 dark:text-accent1 ${
        isActive ? "border border-accent" : "border-0"
      }`}
    >
      <div className="flex gap-x-2 items-center">
        <div> {icon}</div>
        <h1 className={`${className && className}`}>{label}</h1>
      </div>
      <div className="text-dark1 text-opacity-50 dark:text-accent1 dark:text-opacity-50 ">
        <ArrowCircleIcon />
      </div>
    </div>
  );
};
