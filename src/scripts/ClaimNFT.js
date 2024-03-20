import axios from "axios";
import { notifyPromise, notifyResolve } from "./notify";
import { contract } from "./utils";

const claimNFT = async (state) => {
  const notifyId = notifyPromise("Claiming NFT");
  try {
    const { name, description, user } = state;

    const fData = new FormData();
    fData.append("name", name);
    fData.append("description", description);
    fData.append("image", await generateNFTImage());
    fData.append("wallet_address", user.wallet_address || user.magic_wallet);
    fData.append("amount", 1);

    const res = await axios.post("/backend/fvm/mintNFT", fData);
    console.log(res);
    const { metadata } = res.data;

    const transaction = await contract.autoMint(
      user.wallet_address || user.magic_wallet,
      1,
      metadata
      // {
      //   //gasLimit: Math.ceil(gasMargin(gasEstimated, 1.1))
      //   gasPrice: ethers.utils.parseUnits("1000", "gwei"),
      // }
    );
    console.log("transaction", transaction.hash);
    const receipt = await transaction.wait();
    console.log("receipt", receipt);
    const message = "NFT claimed successfully";

    notifyResolve(notifyId, message, "success");
    return {
      receipt,
      message,
      success: true,
    };
  } catch (error) {
    console.log("err", error);
    notifyResolve(notifyId, "Failed to claim NFT", "error");
    return {
      receipt: null,
      message: "Failed to claim NFT",
      success: false,
    };
  }
};

const generateNFTImage = async () => {
  const element = document.getElementById("nftcard");
  console.log("Element", element);
  // const canvas = await html2canvas(element);
  // console.log("canvas",canvas.toDataURL());
  // // var link = document.createElement('a');
  // // link.download = 'filename.png';
  // // link.href = canvas.toDataURL()
  // // link.click();
  const response = await fetch(element.src);
  console.log(response);
  const blob = await response.blob();
  console.log(blob);
  var file = new File([blob], "nftImage");
  return file;
};

export default claimNFT;
