import Button from "components/Button";
import React from "react";
import { useWalletModalToggle } from "../../state/application/hooks";

export default function Web3Connect({ className = "", title, ...rest }: any) {
  const toggleWalletModal = useWalletModalToggle();

  return (
    // <button
    //   id="connect-wallet"
    //   onClick={toggleWalletModal}
    //   variant="outlined"
    //   className={
    //     "relative items-center justify-center  px-6 outline-none lg:flex gap-x-3" +
    //     "text-sm font-normal text-white font-object_sans"
    //   }
    //   {...rest}
    // >
    //   {title}
    // </button>

    <Button
      onClick={toggleWalletModal}
      className="hidden lg:flex justify-between !min-w-[244px] px-3"
    >
      <>
        {/* <div className="w-14">
                <Image
                  src={MetaMaskImg.src}
                  alt="metamask"
                  width={MetaMaskImg.width}
                  height={MetaMaskImg.height}
                  layout="responsive"
                />
              </div> */}
        <h1 className="flex-1 font-outfit font-bold text-base text-white">
          {title}
        </h1>
      </>
    </Button>
  );
}
