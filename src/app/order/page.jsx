"use client";

import { StoreContext } from "@/Context";
import MyOrdersModal from "@/components/modals/MyOrdersModal";
import OrderRouter from "@/components/order/OrderRouter";
import Shipping from "@/components/order/Shipping";
import Steps from "@/components/order/Steps";
import React, { useContext, useState } from "react";

const page = () => {
  const { state, dispatch } = useContext(StoreContext);
  console.log(state);

  return (
    <div className="w-full max-w-screen h-svh flex bg-white text-black">
      <div className="w-full md:w-2/3">
        <OrderRouter />
      </div>
      <div className="hidden md:block md:w-1/3 h-full">
        <Steps />
      </div>
    </div>
  );
};

export default page;
