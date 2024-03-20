import { StoreContext } from "@/Context";
import React, { useContext } from "react";

const NFTDetailsForm = () => {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <div className="h-full w-full py-12 flex flex-col gap-y-6 items-center justify-center">
      <h1 className="text-2xl font-bold w-full">Customize your NFT</h1>
      <form className="flex flex-col w-full h-full items-center gap-y-6">
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "SET_NAME", payload: e.target.value })
            }
            className="border-2 border-black rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={state.description}
            onChange={(e) =>
              dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
            }
            className="border-2 border-black rounded-md p-2"
          />
        </div>
      </form>
    </div>
  );
};

export default NFTDetailsForm;
