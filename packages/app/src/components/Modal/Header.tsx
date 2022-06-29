import { ArrowBackIos, Close } from "@mui/icons-material";
import React, { FC } from "react";
interface ModalHeaderProps {
  title?: string;
  className?: string;
  onClose?: () => void;
  onBack?: () => void;
  textBg?: boolean;
  titleClassName?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  title = undefined,
  onClose = undefined,
  className = "",
  onBack = undefined,
  textBg,
  titleClassName,
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {onBack && (
        <ArrowBackIos
          onClick={onBack}
          width={24}
          height={24}
          className="cursor-pointer "
        />
      )}

      <div className="flex justify-between ">
        {title && (
          <div
            className={`px-2 py-1 rounded font-work_sans ${
              textBg && "bg-primary bg-grey"
            } ${titleClassName}`}
          >
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="font-medium text-sm text-grey mt-3">
              Select your preferred wallet and Let’s Go 🚀
            </p>
          </div>
        )}

        <div
          className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer primary"
          onClick={onClose}
        >
          <Close />
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
