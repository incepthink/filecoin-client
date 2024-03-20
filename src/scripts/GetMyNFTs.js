import axios from "axios";
import { contract } from "./utils";

const getMyNFTs = async (user) => {
  try {
    const result = await contract.tokensOfOwner(
      user.wallet_address || user.magic_wallet
    );
    const nfts = [];

    await Promise.all(
      result.map(async (nft) => {
        try {
          if (!nft.uri) {
            return;
          }
          const { data } = await axios.get(nft.uri);
          nfts.push({
            id: nft.id.toString(),
            quantity: nft.quantity.toString(),
            name: data.name,
            description: data.description,
            image_uri: data.image,
            contract_address: process.env.FVM_NFT_CONTRACT_ADDRESS,
          });
        } catch (error) {
          console.log("error", nft.uri);
        }
      })
    );

    return nfts;
  } catch (error) {
    console.log(error);
    return null
  }
};

export default getMyNFTs;
