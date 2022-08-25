import React, { useEffect, useState } from "react";
import { SUPPORTED_WALLETS, injected } from "../../config/wallets";
import {
  useCloseWalletModal,
  useModalOpen,
  useWalletModalToggle,
} from "state/application/hooks";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { AbstractConnector } from "@web3-react/abstract-connector";
import AccountDetails from "components/AccountDetails";
import { ApplicationModal } from "../../state/application/actions";
import Modal from "../../components/Modal";
import ModalHeader from "components/Modal/Header";
import Option from "./Option";
import { isMobile } from "react-device-detect";
import Link from "next/link";
const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

import { CHAINS, getAddChainParameters, URLS } from "config/chains";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { metaMask } from "connectors/metaMask";

export default function WalletModal({ ENSName }: { ENSName?: string }) {
  const { chainId, account, accounts, active, isActivating } =
    useActiveWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<
    AbstractConnector | undefined
  >();

  const [pendingError, setPendingError] = useState<boolean>();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();
  const closeWalletaModal = useCloseWalletModal();

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      const isNetwork = option.connector instanceof Network;

      // check for mobile options
      if (isMobile && option.mobile) {
        // disable portis on mobile for now
        if (option.name === "Portis") {
          return null;
        }
        console.log("here", (window as any).web3, window.ethereum, option);

        if (!(window as any).web3 && !window?.ethereum) {
          if (option.name === "MetaMask") {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={"#010406"}
                header={"Install Metamask"}
                subheader={null}
                link={"https://metamask.io/"}
                icon="/images/wallets/metamask.png"
              />
            );
          } else {
            return (
              <Option
                onClick={
                  isActivating
                    ? () => console.log("is activating")
                    : () => {
                        console.log("clicked me 1", option.connector);
                        option.connector instanceof WalletConnect ||
                        option.connector instanceof Network
                          ? option.connector.activate(
                              chainId === -1 ? undefined : chainId
                            )
                          : option.connector.activate(
                              chainId === -1
                                ? undefined
                                : getAddChainParameters(chainId)
                            );
                      }
                }
                id={`connect-${key}`}
                key={key}
                active={option.connector && option.connector === true}
                color={option.color}
                link={option.href}
                header={option.name}
                subheader={null}
                icon={"/images/wallets/" + option.iconName}
              />
            );
          }
        } else {
          return (
            <Option
              onClick={
                isActivating
                  ? () => console.log("is activating")
                  : () => {
                      console.log("clicked me 1", option.connector);
                      option.connector instanceof WalletConnect ||
                      option.connector instanceof Network
                        ? option.connector.activate(
                            chainId === -1 ? undefined : chainId
                          )
                        : option.connector.activate(
                            chainId === -1
                              ? undefined
                              : getAddChainParameters(chainId)
                          );
                    }
              }
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === true}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={"/images/wallets/" + option.iconName}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected || option.connector === metaMask) {
        // don't show injected if there's no injected provider
        if (!((window as any).web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={"#010406"}
                header={"Install Metamask"}
                subheader={null}
                link={"https://metamask.io/"}
                icon="/images/wallets/metamask.png"
              />
            );
          } else {
            console.log("hereeeee o");
            return null; // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }
      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={
              isActivating
                ? () => console.log("is activatinggggg")
                : () => {
                    console.log("clicked me 2", option.connector);
                    option.connector instanceof WalletConnect ||
                    option.connector instanceof Network
                      ? (console.log("clicked me oksndvvdjn", option.connector),
                        option.connector.activate(
                          chainId === -1 ? undefined : chainId
                        ))
                      : option.connector.activate(
                          chainId === -1
                            ? undefined
                            : getAddChainParameters(chainId)
                        );
                  }
            }
            key={key}
            active={option.connector === true}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} // use option.descriptio to bring back multi-line
            icon={"/images/wallets/" + option.iconName}
          />
        )
      );
    });
  }

  function getModalContent() {
    // if (account && walletView === WALLET_VIEWS.ACCOUNT) {

    //   return (
    //     <AccountDetails
    //       toggleWalletModal={toggleWalletModal}
    //       ENSName={ENSName}
    //       openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
    //     />
    //   );
    // }

    useEffect(() => {
      if (account && walletView === WALLET_VIEWS.ACCOUNT) {
        closeWalletaModal();
      }
    }, [account]);

    return (
      <div className="flex flex-col space-y-5 text-black">
        <ModalHeader
          title="Connect Wallet"
          titleClassName="text-white"
          onClose={toggleWalletModal}
        />
        <div className="flex flex-col space-y-5">
          {walletView === WALLET_VIEWS.PENDING ? (
            <></>
          ) : (
            <div className="flex flex-col space-y-5 overflow-y-auto">
              {getOptions()}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={walletModalOpen}
      onDismiss={toggleWalletModal}
      minHeight={0}
      maxHeight={90}
      // maxWidth={600}
      backgroundColor="#1B1C20"
    >
      {getModalContent()}
    </Modal>
  );
}
