import { ethers } from "ethers";
import axios from "axios";
import Cookies from "js-cookie";

const connectWallet = async () => {
  if (!window.ethereum || !window.ethereum.isMetaMask) {
    alert("Please use a browser with Metamask");
    return;
  }

  const chainId = 314;
  const requrestNetworkSuccess = await requestNetwork(chainId);
  if (!requrestNetworkSuccess) {
    alert("Not able to change network");
    return;
  }

  try {
    const web3 = new ethers.BrowserProvider(window.ethereum);
    await web3.send("eth_requestAccounts", []);

    const { data } = await axios.get("/backend/user/getToken");
    const message = data.message;

    const res = await axios.post("/backend/user/verifyToken", {
      signature: await (await web3.getSigner()).signMessage(message),
      address: await (await web3.getSigner()).getAddress(),
    });

    const { user_instance, token } = res.data;

    const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

    Cookies.set("user", JSON.stringify(user_instance), {
      expires: inThirtyMins,
    });
    Cookies.set("jwt", token, { expires: inThirtyMins });

    return { user: user_instance, jwt: token };
  } catch (error) {
    console.log(error);
    return { user: null, jwt: null };
  }
};

const requestNetwork = async (chainId) => {
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toQuantity(chainId) }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      console.log(error);
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Polygon Mainnet",
              chainId: ethers.toQuantity(chainId),
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: ["https://polygon-rpc.com/"],
            },
          ],
        });
      } else {
        console.log(error);
        return false;
      }
    }
    return true;
  }
};

export default connectWallet;
