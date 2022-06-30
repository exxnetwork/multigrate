import React, { useState } from "react";
import ArrowCircleIcon from "icons/ArrowCircle";
import DashboardLayout from "Layout/DashboardLayout";

import FAQ from "mock/faq.json";
import MinusIcon from "icons/Minus";
import PlusIcon from "icons/PlusIcon";

const Faq = () => {
  const [activeFaq, setActiveFaq] = useState(FAQ.data[0]);

  return (
    <DashboardLayout
      pageTitle="Frequently asked Questions"
      subTitle="We have answered a few questions you might want to ask..."
    >
      <>
        <div className="hidden lg:flex gap-x-10 lg:pt-8">
          <div className="w-1/3 space-y-4">
            {FAQ.data.map((data, i) => (
              <FaqButton
                key={i}
                faqData={data}
                {...{ activeFaq, setActiveFaq }}
              />
            ))}
          </div>

          <div className="flex-1 bg-white dark:bg-dark4 p-7 shadow-faq rounded-md min-h-[70vh]">
            <h1 className="font-outfit font-semibold text-base text-dark1 dark:text-white">
              {activeFaq.title}
            </h1>

            <p
              className="font-outfit font-normal text-sm leading-7 text-dark1 dark:text-white py-4"
              dangerouslySetInnerHTML={{ __html: activeFaq.content }}
            />
          </div>
        </div>

        <MobileFaq data={FAQ.data} />
      </>
    </DashboardLayout>
  );
};

export default Faq;

interface FaqButtonProps {
  faqData: {
    title: string;
    content: string;
  };
  activeFaq: { title: string; content: string };
  setActiveFaq: (val: {}) => void;
}

const FaqButton = ({ faqData, activeFaq, setActiveFaq }: FaqButtonProps) => {
  const isActive =
    faqData.title.toLowerCase() === activeFaq.title.toLowerCase();

  return (
    <div
      onClick={() => setActiveFaq(faqData)}
      className={`cursor-pointer flex justify-between items-center bg-grey dark:bg-dark4 rounded-[10px] px-5 py-5 shadow-faq ${
        isActive ? "border border-accent" : "border-0"
      }`}
    >
      <h1 className="font-outfit font-semibold text-base text-dark1 dark:text-grey">
        {faqData.title.length >= 30
          ? `${faqData.title.substring(0, 30)}...`
          : faqData.title}
      </h1>
      <div className="text-black dark:text-grey dark:text-opacity-50">
        <ArrowCircleIcon />
      </div>
    </div>
  );
};

export const MobileFaq = ({ data }: any) => {
  const [selected, setSelected] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    if (selected === index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  return (
    <>
      {data.map((data, i) => (
        <div
          key={i}
          onClick={() => toggleAccordion(i)}
          className={`cursor-pointer flex lg:hidden justify-between items-center bg-grey dark:bg-dark4 rounded-[10px] px-4 py-5 mb-4 shadow-faq ${
            selected === i ? "border border-accent" : "border-0"
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <h1 className="font-outfit font-semibold text-sm text-dark1 dark:text-grey">
                {data.title.length >= 30
                  ? `${data.title.substring(0, 30)}...`
                  : data.title}
              </h1>
              <button className="outline-none text-black dark:text-white">
                {selected === i ? <MinusIcon /> : <PlusIcon />}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                selected === i
                  ? "h-auto max-h-screen ease-in"
                  : "max-h-0 ease-out"
              }`}
            >
              <p className="font-outfit font-normal text-sm leading-7 text-dark1 dark:text-grey py-4">
                {data.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
