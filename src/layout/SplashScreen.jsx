import React from "react";
import logo from "../assets/tp-logo.jpg";

export default function SplashScreen() {
  return (
    <div className=" w-full h-[100vh]   flex-col gap-4  flex items-center justify-center">
      <img src={logo} className="w-[131px] mx-[10px] pt-4" />
    </div>
  );
}
