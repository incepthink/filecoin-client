import { ethers } from "ethers";
import NFTMINTERABI from "@/library/NFTMINTERABI.json";

const returnShortAddress = (address) => {
  if (address) {
    return (
      address.substring(0, 6) +
      "..." +
      address.substring(address.length - 4, address.length)
    );
  } else {
    return "N/A";
  }
};

const provider = new ethers.JsonRpcProvider(
  "https://rpc.ankr.com/filecoin_testnet"
);
const walletSigner = new ethers.Wallet(process.env.FVM_PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.FVM_NFT_CONTRACT_ADDRESS,
  NFTMINTERABI,
  walletSigner
);

export { returnShortAddress, contract };
