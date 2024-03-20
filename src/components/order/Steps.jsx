import { StoreContext } from "@/Context";
import React, { useContext, useState } from "react";
import Image from "next/image";

const StepIndicator = () => {
  const { state, dispatch } = useContext(StoreContext);

  const steps = [
    "Shipping Details",
    "Review Details",
    "Burn NFT",
    "Place Order",
    "Complete",
  ];

  return (
    <div className="flex flex-col items-center justify-around max-w-full w-full h-full pl-4 border-l-2">
      <div>
        {steps.map((description, index) => {
          const isCompleted = state.orderStage > index + 1;
          const isActive = state.orderStage === index + 1;

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-full"
            >
              <div className="flex gap-x-2 items-start w-full justify-start">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                    isActive || isCompleted ? "bg-sky-500" : "bg-sky-200"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm pt-2 ${
                    isActive || isCompleted ? "text-black" : "text-gray-500"
                  }`}
                >
                  {description}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-full flex justify-start items-center">
                  <div className="w-10 flex items-center justify-center">
                    <div
                      className={`w-1 bg-${
                        isCompleted ? "sky-500" : "sky-200"
                      } h-8`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="lg:flex flex-col gap-y-12 hidden">
        <a
          href="https://www.hashcase.co"
          target="_blank"
          className="flex items-center justify-center gap-x-2 bg-black text-white text-xs md:text-base lg:text-lg font-semibold p-3 px-6 rounded-xl cursor-pointer"
        >
          <h1>Powered By</h1>
          <Image
            src="/images/hashcase_logo.png"
            alt="hashcase_logo"
            width={1519}
            height={271}
            className="w-[80px] md:w-[100px] lg:w-[150px]"
          />
        </a>
      </div>
    </div>
  );
};

export default StepIndicator;
