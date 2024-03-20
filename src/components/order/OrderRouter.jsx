import React, { useContext } from "react";
import Shipping from "./Shipping";
import { StoreContext } from "@/Context";
import ReviewDetails from "./ReviewDetails";
import BurnNFT from "./BurnNFT";
import PlaceOrder from "./PlaceOrder";
import Complete from "./Complete";

const OrderRouter = () => {
  const { state, dispatch } = useContext(StoreContext);
  const getComponent = () => {
    switch (state.orderStage) {
      case 1:
        return <Shipping />;
      case 2:
        return <ReviewDetails />;
      case 3:
        return <BurnNFT />;
      case 4:
        return <PlaceOrder />;
      default:
        return <Complete />;
    }
  };
  return getComponent();
};

export default OrderRouter;
