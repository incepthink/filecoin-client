import axios from "axios";

const transferToWallet = async (user_id, wallet_address) => {
  try {
    alert("Transfer disabled for this collection!");
    throw new Error("Transfer disabled for this collection!");
  } catch (error) {
    console.error(error);
    return {
      status: "Transfer failed",
      response: null,
    };
  }
};

export default transferToWallet;
