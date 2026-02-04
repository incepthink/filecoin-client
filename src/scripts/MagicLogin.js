import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import Cookies from "js-cookie";
import axios from "axios";

const getMagic = async () => {
  const customNodeOptions = {
    rpcUrl: "https://polygon-rpc.com/", // Polygon RPC URL
    chainId: 137, // Polygon chain id
  };
  const magic = new Magic(process.env.MAGICLINK_PUBLISHABLE_KEY, {
    network: customNodeOptions,
    extensions: [new OAuthExtension()],
  });
  return magic;
};

const loginWithMagic = async () => {
  const magic = await getMagic();
  const didToken = await magic.oauth.loginWithRedirect({
    provider: "google",
    redirectURI: `${window.location.origin}/verify`,
  });
};

const magicBackendLogin = async (did) => {
  try {
    const res = await axios.post("https://api.hashcase.co/user/magicLogin", {
      did,
    });
    const { user_instance, token } = res.data;

    const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
    Cookies.set("user", JSON.stringify(user_instance), {
      expires: inThirtyMins,
    });
    Cookies.set("jwt", token, { expires: inThirtyMins });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default loginWithMagic;
export { getMagic, magicBackendLogin };
