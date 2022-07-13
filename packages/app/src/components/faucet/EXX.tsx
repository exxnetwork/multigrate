import React, { useState } from "react";
import Image from "next/image";

import Button from "components/Button";
import MetaMaskImg from "/public/assets/images/metamask.svg";

const EXX = ({ isActive, toggleFaucetTransferModal }) => {
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
            readOnly
            className="flex-1 bg-transparent px-3 lg:px-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
          />
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
            className="flex-1 bg-transparent px-3 lg:px-6 h-full font-outfit text-sm text-dark1 dark:text-grey"
          />
        </div>
      </div>

      <Button
        onClick={toggleFaucetTransferModal}
        disabled={true}
        className="mt-8 w-full !bg-accent"
      >
        <h1 className="font-work_sans font-semibold text-base text-white">
          Submit
        </h1>
      </Button>
    </div>
  );
};

export default EXX;

interface RadioButtonProps {
  title: string;
  selectedToken: string;
  setSelectedToken: (val: string) => void;
}

const RadioButton = ({
  title,
  selectedToken,
  setSelectedToken,
}: RadioButtonProps) => {
  const isActive = title.toLowerCase() === selectedToken.toLowerCase();
  return (
    <label
      onClick={() => setSelectedToken(title)}
      htmlFor={title}
      className="radioWrapper"
    >
      <input
        type="radio"
        name="transmissionType"
        id={title}
        value={title}
        // checked={isActive}
        className="appearanceRadio"
      />
      <div
        className="radio"
        style={{
          borderColor: isActive ? "#174AFF" : "#2E6ECB",
        }}
      ></div>
      <h1
        className={`font-outfit font-semibold text-sm text-dark ${
          isActive
            ? "text-opacity-100 dark:text-grey"
            : "text-opacity-70 dark:text-grey dark:text-opacity-70"
        } ml-2 lg:ml-3`}
      >
        {title}
      </h1>
    </label>
  );
};
