import React, { useEffect, useState } from "react";

import Button from "components/Button";
import CoinImg from "/public/assets/images/hyper.svg";
import Image from "next/image";
import { ethers, Contract, BigNumber } from "ethers";
import { useExxfiContract, useHypersonicContract } from "hooks/useContract";
import { useSelector, RootStateOrAny } from "react-redux";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import useBalances from "hooks/useBalance";
import { formatBalance } from "functions/format";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

const SPENDER_ADDRESS = "0xb09c720eacabfae14bdb09e1bfd1b645943b4351"; // spender address is the migrators contract address

const WHSN = ({
  isActive,
  toggleMigrateHSNModal,
  hypersonicAmount,
  setHypersonicAmount,
}) => {
  const contract = useExxfiContract();
  const hypersonicContract = useHypersonicContract();
  const { library, accounts, account, connector, chainId } =
    useActiveWeb3React();
  const balances = useBalances(library, accounts);

  const [allowance, setAllowance] = useState(BigNumber.from(0));
  const [hypersonicBalance, setHypersonicBalance] = useState("");
  const [approving, setApproving] = useState(false);

  console.log("HYPERSONIC", hypersonicContract);
  useEffect(() => {
    if (hypersonicContract) {
      checkAllowance();
      fetchHypersonicBalance();
    }
  }, [hypersonicContract]);

  const fetchHypersonicBalance = async () => {
    try {
      const res = await hypersonicContract.balanceOf(account);

      setHypersonicBalance(
        Math.floor(Number(ethers.utils.formatEther(res))).toString()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const checkAllowance = async () => {
    try {
      const res = await hypersonicContract.allowance(account, SPENDER_ADDRESS);

      console.log("RES", res);

      setAllowance(res);
    } catch (error) {
      console.error(error);
    }
  };

  const approveMigrationHandler = async (e: any) => {
    setApproving(true);
    e.preventDefault();

    const max = ethers.constants.MaxUint256;

    try {
      if (allowance.lt(ethers.utils.parseUnits(hypersonicAmount, 18))) {
        const res = await hypersonicContract.approve(SPENDER_ADDRESS, max);

        await res.wait();
        console.log("approve res", res);

        setApproving(false);
        toggleMigrateHSNModal();
      } else {
        setApproving(false);
        toggleMigrateHSNModal();
      }
    } catch (error) {
      console.error("approve err", error);
      setApproving(false);
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
          Enter HSN token Value
        </h1>
        <h1 className="font-outfit font-bold text-sm text-dark1 dark:text-grey text-opacity-50 dark:text-opacity-50">
          Balance: &nbsp;
          {hypersonicBalance ? hypersonicBalance : "0"} HSN
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
              type="number"
              placeholder="Enter Value"
              value={hypersonicAmount}
              onChange={(e) => setHypersonicAmount(e.target.value)}
              required
              className="flex-1 bg-transparent pl-3 pr-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
            />
          </div>
          <button
            type="button"
            onClick={() => setHypersonicAmount(hypersonicBalance)}
          >
            <h1 className="font-outfit font-bold text-sm text-accent">Max</h1>
          </button>
        </div>
        <h1 className="font-outfit font-normal text-sm text-dark text-opacity-50 dark:text-opacity-50 dark:text-grey">
          You get: &nbsp;{" "}
          <span className="font-bold">
            {hypersonicAmount} {hypersonicAmount && "WHSN"}
          </span>
        </h1>

        <Button disabled={approving} className="mt-8 w-full">
          <>
            <h1 className="font-outfit font-bold text-base text-white mr-3">
              Continue
            </h1>
            {approving && (
              <Oval height="25" width="25" color="white" ariaLabel="loading" />
            )}
          </>
        </Button>
      </form>
    </div>
  );
};

export default WHSN;
