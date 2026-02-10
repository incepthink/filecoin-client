import { StoreContext } from "@/Context";
import getMyNFTs from "@/scripts/GetMyNFTs";
import { useContext, useEffect } from "react";
import Link from "next/link";

const MyNFTsModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;
  const { state, dispatch } = useContext(StoreContext);
  if (!state.user) {
    return null;
  }

  const handleGetMyNFTs = async () => {
    console.log("fetching my nfts");
    dispatch({ type: "SET_MY_NFTS", payload: null });
    const nfts = await getMyNFTs(224);
    dispatch({ type: "SET_MY_NFTS", payload: nfts });
  };

  useEffect(() => {
    handleGetMyNFTs();
  }, [showModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-4xl w-full h-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">My NFTs</h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-600 hover:text-gray-800 transition ease-in-out duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
          {state.myNFTs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.myNFTs.map((nft, index) => (
                <NFTCard key={index} nft={nft} />
              ))}
            </div>
          ) : (
            <h1 className="text-center text-lg text-gray-500">
              Fetching NFTs...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNFTsModal;

const NFTCard = ({ nft }) => {
  const { dispatch } = useContext(StoreContext);

  return (
    <div className="flex flex-col bg-gray-50 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
      <img
        src={nft?.image_uri}
        alt="nft"
        className="w-full h-56 object-cover"
      />
      <div className="p-3">
        <div className="text-base font-bold text-gray-900 truncate">{nft?.name}</div>
        <div className="text-sm text-gray-500 line-clamp-2 mt-1">
          {nft?.description}
        </div>
      </div>
    </div>
  );
};
