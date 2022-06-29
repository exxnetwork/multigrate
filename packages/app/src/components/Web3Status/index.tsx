import React, { useMemo } from "react";
// import { SUPPORTED_WALLETS, injected } from '../../config/wallets'

import { AbstractConnector } from "@web3-react/abstract-connector";
import Image from "next/image";
// import { NetworkContextName } from '../../constants'
// import WalletModal from "modals/WalletModal";
import Web3Connect from "../Web3Connect";
import styled from "styled-components";
import { useWalletModalToggle } from "../../state/application/hooks";
import {
  ArrowBackIos,
  ArrowDropDown,
  KeyboardArrowDown,
  Person,
} from "@mui/icons-material";
import { formatBalance, shortenAddress } from "functions/format";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import type { Connector } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";
import { WalletLink } from "@web3-react/walletlink";
import useBalances from "hooks/useBalance";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import dynamic from "next/dynamic";
import Button from "components/Button";
const WalletModal = dynamic(() => import("modals/WalletModal"), { ssr: false });

function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof WalletConnect) return "WalletConnect";
  if (connector instanceof WalletLink) return "WalletLink";
  if (connector instanceof Network) return "Network";
  return "Unknown";
}

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + "px" : "32px")};
    width: ${({ size }) => (size ? size + "px" : "32px")};
  }
`;

const SOCK = (
  <span
    role="img"
    aria-label="has socks emoji"
    style={{ marginTop: -4, marginBottom: -4 }}
  >
    🧦
  </span>
);

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: Connector }) {
  const name = getName(connector);
  if (name === "MetaMask") {
    // return <Image src="/chef.svg" alt="Injected (MetaMask etc...)" width={20} height={20} />
    return (
      <IconWrapper size={16}>
        <Person />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "WalletConnect") {
    return (
      <IconWrapper size={16}>
        <Image
          src="/images/wallets/wallet-connect.svg"
          alt={"Wallet Connect"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (name === "WalletLink") {
    return (
      <IconWrapper size={16}>
        <Image
          src="/images/wallets/coinbase.svg"
          alt={"Coinbase Wallet"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else {
    return null;
  }
}

function Web3StatusInner({ title, className, invert, toggleDisconnectModal }) {
  const { library, accounts, account, connector, chainId } =
    useActiveWeb3React();
  const balances = useBalances(library, accounts);
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return (
      <div className="hidden lg:flex gap-x-3 items-center">
        {account && chainId && balances && (
          <>
            <div className={`font-outfit font-bold text-sm pr-3 text-white`}>
              {balances?.[0] ? ` ${formatBalance(balances[0], 18, 2)}` : null}{" "}
              BNB
            </div>
          </>
        )}
        <Button
          onClick={toggleDisconnectModal}
          className="flex justify-between items-center !min-w-[244px] px-3"
        >
          <div className="w-full flex justify-between items-center">
            <p className="mr-2 font-outfit text-sm lg:text-lg text-dark text-opacity-40">
              {shortenAddress(account)}
            </p>
            <KeyboardArrowDown className="text-white" />
            {/* {connector && <StatusIcon connector={connector} />} */}
          </div>
        </Button>
      </div>
    );
  } else {
    return <Web3Connect title={title} className={className} invert={invert} />;
  }
}

export default function Web3Status({
  title,
  className,
  invert,
  toggleDisconnectModal,
}: {
  title?: string;
  className?: string;
  invert?: boolean;
  toggleDisconnectModal?: () => void;
}) {
  // const isActive = useIsActive()

  return (
    <>
      <Web3StatusInner
        title={title}
        className={className}
        invert={invert}
        toggleDisconnectModal={toggleDisconnectModal}
      />
      <WalletModal ENSName={undefined} />
    </>
  );
}
