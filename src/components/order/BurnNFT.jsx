import { StoreContext } from "@/Context";
import handleBurnNFT from "@/scripts/BurnNFT";
import React, { useContext, useEffect } from "react";

const BurnNFT = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    setTimeout(() => {
      handleBurnNFT(state, dispatch);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <h1>Burning Your NFT...</h1>
        <h1>Please keep this tab open until your order is placed</h1>
      </div>
    </div>
  );
};

export default BurnNFT;
