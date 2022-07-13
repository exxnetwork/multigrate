import React from "react";

const TestBalanceTable = () => {
  return (
    <div className="bg-grey pb-3 dark:bg-dark1 dark:bg-opacity-40 rounded border border-[#DBD8FC] overflow-hidden">
      <div className="h-16 px-6 bg-[#DBD8FC30] border-b border-[#DBD8FC] flex justify-between items-center">
        <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50">
          Tokens
        </h1>
        <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50">
          Test Balances
        </h1>
        <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50">
          Disbursed
        </h1>
      </div>
      <List title="EXX" lists={["59840.51", "59840.51"]} />
      <List title="EFT " lists={["59840.51", "59840.51"]} last />
    </div>
  );
};

export default TestBalanceTable;

const List = ({ title, lists, last = false }) => {
  return (
    <div
      className="py-5 px-6 flex justify-between items-center border-b border-[#DBD8FC]"
      style={{ border: last && 0 }}
    >
      <h1 className="font-work_sans font-normal text-sm text-dark1 text-opacity-50">
        {title}
      </h1>
      {lists.map((val: string, i: number) => (
        <h1 key={i} className="font-work_sans font-normal text-base text-black">
          {val}
        </h1>
      ))}
    </div>
  );
};
