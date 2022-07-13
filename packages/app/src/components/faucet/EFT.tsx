import React, { useState } from "react";
import Image from "next/image";

import Button from "components/Button";
import MetaMaskImg from "/public/assets/images/metamask.svg";

const EFT = ({ isActive, toggleFaucetTransferModal }) => {
  return (
    <div
      className={`pb-3 transition-all ease-in-out space-y-6 ${
        isActive
          ? "fade-in max-h-max pointer-events-auto"
          : "fade-out max-h-0 pointer-events-none"
      }`}
    >
      <div>
        <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50 dark:text-opacity-50 dark:text-grey">
          Network
        </h1>
        <div className="h-14 flex rounded bg-white dark:bg-dark3  border border-[#DBD8FC] mt-2 pr-3 lg:pr-6">
          <input
            type="text"
            placeholder="Enter Value"
            className="flex-1 bg-transparent px-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
          />

          <button className="">
            <h1 className="font-work_sans font-semibold text-sm text-accent">
              Add EXX Network
            </h1>
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50 dark:text-opacity-50 dark:text-grey">
          Paste Wallet Address
        </h1>
        <div className="h-14 flex rounded bg-white dark:bg-dark3 border border-[#DBD8FC] mt-2 pr-3 lg:pr-6">
          <input
            type="text"
            placeholder="Enter Value"
            className="flex-1 bg-transparent px-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
          />
        </div>
      </div>

      <Button
        onClick={toggleFaucetTransferModal}
        disabled={false}
        className="mt-8 w-full !bg-accent"
      >
        <h1 className="font-work_sans font-semibold text-base text-white">
          Submit
        </h1>
      </Button>
      <button className="flex gap-x-4 justify-center items-center w-full h-14 rounded border border-[#DBD8FC50]">
        <div className="w-14">
          <Image
            src={MetaMaskImg.src}
            alt="metamask"
            width={MetaMaskImg.width}
            height={MetaMaskImg.height}
            layout="responsive"
          />
        </div>
        <h1 className="font-work_sans font-semibold text-base text-dark">
          Add Exx Network
        </h1>
      </button>
    </div>
  );
};

export default EFT;
