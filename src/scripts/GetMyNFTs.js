import axios from "axios";
import Cookies from "js-cookie";

const getMyNFTs = async (collectionId) => {
  try {
    const id = collectionId || process.env.COLLECTION_ID;
    const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
    const userId = user?.id;
    const { data } = await axios.get(
      `https://api.hashcase.co/platform/nfts/by-collection?collection_id=${id}&user_id=${userId}`
    );
    return data.nfts || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getMyNFTs;
