import axios from "axios";
import { notifyPromise, notifyResolve } from "./notify";

const NFT_IMAGE_URL =
  "https://lime-occasional-angelfish-940.mypinata.cloud/ipfs/bafkreig6b4lc3i3lihyiedahx76wnrlcxyyemeikkoov7zmffcoqc32jfm";

const claimNFT = async (state) => {
  const notifyId = notifyPromise("Claiming NFT");
  try {
    const { name, description, user } = state;

    const fData = {
      collection_id: 224,
      name,
      description,
      image_url: NFT_IMAGE_URL,
      attributes: [],
      recipient: user.wallet_address || user.magic_wallet,
      amount: 1,
      metadata_id: 49,
    };

    const res = await axios.post("https://api.hashcase.co/platform/mint-nft", fData);
    console.log(res);
    const { data } = res.data;
    const message = "NFT claimed successfully";

    notifyResolve(notifyId, message, "success");
    return {
      data,
      message,
      success: true,
    };
  } catch (error) {
    console.log("err", error);
    notifyResolve(notifyId, "Failed to claim NFT", "error");
    return {
      data: null,
      message: "Failed to claim NFT",
      success: false,
    };
  }
};

export default claimNFT;
