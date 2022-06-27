import React, { useState } from "react";

import Button from "components/Button";
import CoinImg from "/public/assets/images/coin.svg";
import Image from "next/image";

const ExxFiMigration = ({ isActive, toggleMigrateTokenModal }) => {
  const [selectedToken, setSelectedToken] = useState<string>("SSN");

  return (
    <div
      className={`pb-3 transition-all ease-in-out ${
        isActive
          ? "fade-in max-h-max pointer-events-auto"
          : "fade-out max-h-0 pointer-events-none"
      }`}
    >
      <div className="pb-10">
        <h1 className="font-outfit font-normal text-sm text-dark1 text-opacity-50 dark:text-opacity-50 dark:text-grey">
          Select token to migrate from...
        </h1>
        <div className="flex items-center gap-x-7 lg:gap-x-10 pt-5">
          <RadioButton title="SSN" {...{ selectedToken, setSelectedToken }} />
          <RadioButton title="WSSN" {...{ selectedToken, setSelectedToken }} />
          <RadioButton
            title="Hypersonic"
            {...{ selectedToken, setSelectedToken }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="font-outfit font-normal text-sm text-dark1 text-opacity-50 dark:text-opacity-50 dark:text-grey">
          Enter SSN token Value
        </h1>
        <h1 className="font-outfit font-bold text-sm text-dark1 text-opacity-50 dark:text-opacity-50 dark:text-grey">
          Balance: 0.02
        </h1>
      </div>
      <div className="h-14 flex rounded-2xl bg-accent1 dark:bg-dark3 my-4 pr-3 lg:pr-6">
        <div className="flex-1 flex pl-3">
          <div className="w-6 lg:w-9 self-center">
            <Image
              src={CoinImg}
              alt={selectedToken}
              width={CoinImg.width}
              height={CoinImg.height}
              layout="responsive"
            />
          </div>
          <input
            type="text"
            placeholder="Enter Value"
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

      <Button
        onClick={toggleMigrateTokenModal}
        className="mt-8 lg:mt-12 w-full"
      >
        <h1 className="font-outfit font-bold text-base text-white">Continue</h1>
      </Button>
    </div>
  );
};

export default ExxFiMigration;

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
