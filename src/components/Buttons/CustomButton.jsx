import React from "react";

export const CustomButton = ({
  text,
  textColor,
  bg,
  borderColor,
  onclick,
  width,
}) => {
  return (
    <div
      onClick={onclick}
      style={{
        color: textColor,
        background: bg,
        borderColor: borderColor,
        width: width,
      }}
      className=" rounded-full py-2 border flex items-center justify-center cursor-pointer"
    >
      <div className="text-sm  font-medium ">{text}</div>
    </div>
  );
};
