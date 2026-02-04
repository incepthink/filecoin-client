import { StoreContext } from "@/Context";
import React, { useContext, useEffect } from "react";
import axios from "axios";

const BurnNFT = () => {
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    setTimeout(() => {
      placeOrder(state, dispatch);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div>
        <h1>Placing Your Order...</h1>
        <h1>Please keep this tab open until your order is placed</h1>
      </div>
    </div>
  );
};

export default BurnNFT;

const placeOrder = async (state, dispatch) => {
  try {
    const res = await axios.post(
      "https://api.hashcase.co/orders/createOrder",
      {
        user_id: state.user.id,
        shipping_id: state.shippingDetails.shipping_id,
        nft_id: state.orderNFT.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.jwt}`,
        },
      }
    );
    console.log(res);
    dispatch({
      type: "SET_ORDER_STAGE",
      payload: 5,
    });
  } catch (error) {
    console.log(error);
  }
};
