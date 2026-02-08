"use client";

import { StoreContext } from "@/Context";
import getMyNFTs from "@/scripts/GetMyNFTs";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const Profile = () => {
  const { address } = useParams();
  const { state, dispatch } = useContext(StoreContext);

  const handleGetMyNFTs = async () => {
    console.log("fetching my nfts");
    dispatch({ type: "SET_MY_NFTS", payload: null });
    const nfts = await getMyNFTs(224);
    dispatch({ type: "SET_MY_NFTS", payload: nfts });
  };

  useEffect(() => {
    handleGetMyNFTs();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black w-full flex flex-col items-center">
      <div className="py-4 w-full bg-primary text-white flex justify-center">
        <div className="max-w-6xl w-full flex items-center gap-x-4 justify-center">
          <h1 className="text-4xl font-semibold">My Profile</h1>
        </div>
      </div>
      <div className="max-w-6xl w-full">
        <div className="text-lg my-6 font-mono w-full break-words">
          <p>{address}</p>
        </div>
        <div className="max-w-6xl mx-auto">
          {!state.myNFTs ? (
            <p className="text-center text-xl">Loading your NFTs...</p>
          ) : state.myNFTs.length === 0 ? (
            <p className="text-center text-xl">You don't have any NFTs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.myNFTs.map((nft) => (
                <div
                  key={nft.id}
                  className="bg-zinc-100 p-2 rounded-xl overflow-hidden transform transition duration-500 hover:scale-105 border-2 border-black"
                >
                  <img
                    src={nft.image_uri}
                    alt={nft.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-y-1 p-5">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {nft.name}
                    </h3>
                    <p className="text-xl text-gray-600">{nft.description}</p>
                    <p className="font-bold text-gray-800">
                      Token ID: {nft.token_id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
