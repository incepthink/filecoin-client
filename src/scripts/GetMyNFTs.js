import axios from "axios";

const getMyNFTs = async (collectionId) => {
  try {
    const id = collectionId || process.env.COLLECTION_ID;
    const { data } = await axios.get(
      `https://api.hashcase.co/platform/nfts/by-collection?collection_id=${id}`
    );
    return data.nfts || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getMyNFTs;
