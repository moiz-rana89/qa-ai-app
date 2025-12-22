import React from "react";

export default function Skeleton({
  className = "", // your custom CSS + Tailwind
  width, // optional
  height, // optional
  rounded = "rounded-md",
  animate = true,
  style = {}, // allow pure CSS override
}) {
  return (
    <div
      className={`
        bg-gray-200
        ${animate ? "animate-pulse" : ""}
        ${rounded}
        ${className}
      `}
      style={{
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
        ...style,
      }}
    />
  );
}
