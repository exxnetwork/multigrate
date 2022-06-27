import React from "react";

type ButtonProps = {
  disabled?: Boolean;
  className?: String;
  children: JSX.Element;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`outline-none px-6 min-w-[112px] lg:min-w-[130px] h-14 flex justify-center items-center bg-button-gradient rounded-[10px] hover:bg-button-hover-gradient transition-opacity ease-linear delay-150 ${
        disabled
          ? "!bg-opacity-70 cursor-not-allowed"
          : "bg-opacity-100 cursor-pointer"
      } ${className}`}
      disabled={disabled ? true : false}
    >
      <>{children}</>
    </button>
  );
};

export default Button;
