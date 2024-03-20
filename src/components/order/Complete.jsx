import { StoreContext } from "@/Context";
import React, { useContext } from "react";
import Link from "next/link";

const BurnNFT = () => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-y-6 items-center">
        <h1>Order Placed!</h1>
        <Link href="/">
          <button className="bg-primary text-white p-3 rounded-xl">Return to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default BurnNFT;
