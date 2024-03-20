import axios from "axios";
import { notifyPromise, notifyResolve } from "./notify";
import { contract } from "./utils";

const handleBurnNFT = async (state, dispatch) => {
  try {
    const transaction = await contract.burn(
      state.user.wallet_address || state.user.magic_wallet,
      parseInt(state.orderNFT.id),
      1
    );
    console.log(transaction);
    const receipt = await transaction.wait();
    if (receipt.status == 1) {
      dispatch({
        type: "SET_ORDER_STAGE",
        payload: 4,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "SET_ORDER_STAGE",
      payload: 4,
    });
  }
};

export default handleBurnNFT;
