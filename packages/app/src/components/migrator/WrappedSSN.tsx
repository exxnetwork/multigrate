import React, { useState } from "react";

import Button from "components/Button";
import CoinImg from "/public/assets/images/coin.svg";
import Image from "next/image";
import { ethers, Contract, BigNumber } from "ethers";
import { useExxfiContract, useSSNToken } from "hooks/useContract";
import { useSelector, RootStateOrAny } from "react-redux";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";

const SPENDER_ADDRESS = "0x6346F5B80a1C3A597C6752738e4a6F7dbB284C1B"; // spender address is the migrators contract address

const WrappedSSN = ({
  isActive,
  toggleMigrateTokenModal,
  ssnAmount,
  setSsnAmount,
}) => {
  const contract = useExxfiContract();
  const ssnContract = useSSNToken();
  const { library, accounts, account, connector, chainId } =
    useActiveWeb3React();

  //   console.log("CONTRACT_", contract);
  //   console.log("SSN_CONTRACT_", ssnContract);

  const approveMigrationHandler = async (e: any) => {
    e.preventDefault();

    try {
      const res = await ssnContract.approve(
        SPENDER_ADDRESS,
        Number(ssnAmount) * 1000000000
      );
      console.log("approve res", res);

      toggleMigrateTokenModal();
    } catch (error) {
      console.error("approve err", error);
    }
  };

  return (
    <div
      className={`pb-3 transition-all ease-in-out ${
        isActive
          ? "fade-in max-h-max pointer-events-auto"
          : "fade-out max-h-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center">
        <h1 className="font-outfit font-normal text-sm text-dark1 dark:text-grey text-opacity-50 dark:text-opacity-50 ">
          Enter SSN token Value
        </h1>
        <h1 className="font-outfit font-bold text-sm text-dark1 dark:text-grey text-opacity-50 dark:text-opacity-50">
          Balance: 0.02
        </h1>
      </div>
      <form onSubmit={approveMigrationHandler}>
        <div className="h-14 flex rounded-2xl bg-accent1 dark:bg-dark3 my-4 pr-3 lg:pr-6">
          <div className="flex-1 flex pl-3">
            <div className="w-6 lg:w-9 self-center">
              <Image
                src={CoinImg}
                alt="token"
                width={CoinImg.width}
                height={CoinImg.height}
                layout="responsive"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Value"
              value={ssnAmount}
              onChange={(e) => setSsnAmount(e.target.value)}
              required
              className="flex-1 bg-transparent pl-3 pr-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
            />
          </div>
          <button className="">
            <h1 className="font-outfit font-bold text-sm text-accent">Max</h1>
          </button>
        </div>
        <h1 className="font-outfit font-normal text-sm text-dark text-opacity-50 dark:text-opacity-50 dark:text-grey">
          You get: &nbsp; <span className="font-bold">0.034WSSN</span>
        </h1>

        <Button className="mt-8 w-full">
          <h1 className="font-outfit font-bold text-base text-white">
            Continue
          </h1>
        </Button>
      </form>
    </div>
  );
};

export default WrappedSSN;
