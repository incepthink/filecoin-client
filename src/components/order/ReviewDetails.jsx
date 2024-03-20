import React, { useContext } from "react";
import { StoreContext } from "@/Context";

const ReviewDetails = () => {
  const { state, dispatch } = useContext(StoreContext);

  const handleEdit = () => {
    dispatch({ type: "SET_ORDER_STAGE", payload: 1 });
  };

  const handleConfirm = () => {
    dispatch({ type: "SET_ORDER_STAGE", payload: 3 });
  };

  return (
    <div className="px-4 py-10 flex flex-col items-center w-full text-left h-fit bg-white">
      <h1 className="text-3xl">Review Your Shipping Details</h1>
      <div className="max-w-md w-full mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl p-8">
        <div key="nft-name" className="mb-4">
          <h2 className="font-semibold capitalize">NFT Token ID</h2>
          <p>{state.orderNFT.id}</p>
        </div>
        {Object.entries(state.shippingDetails || {}).map(([key, value]) => {
          if (
            ["user_id", "shipping_id", "createdAt", "updatedAt"].includes(key)
          ) {
            return null; // Ignore these keys
          }
          return (
            <div key={key} className="mb-4">
              <h2 className="font-semibold capitalize">
                {key.split("_").join(" ")}
              </h2>
              <p>{value}</p>
            </div>
          );
        })}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleEdit}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={handleConfirm}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
