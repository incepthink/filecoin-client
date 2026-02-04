import React from "react";

const ClaimingModal = ({ showModal, setShowModal, transactionDetails }) => {
  if (!showModal) return null;

  return (
    <div className="absolute w-full h-full z-20 backdrop-blur-sm bg-white/40 flex justify-center items-center">
      <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-fit relative bg-white border-2 border-black rounded-md m-1">
        <button
          onClick={() => setShowModal(false)}
          className="absolute bg-primary text-white font-black top-2 right-2 px-3 py-1 rounded xl"
        >
          X
        </button>
        <div className="w-full flex flex-col font-bold px-6 py-12 gap-y-2">
          <h1 className="text-center text-2xl">Claiming NFT</h1>
          <h1 className="">
            Status:{" "}
            <span className="font-normal">
              {transactionDetails?.message || "Claiming your NFT. Please wait..."}
            </span>
          </h1>
          {transactionDetails && (
            <h1 className="">
              Transaction Hash:{" "}
              <span className="font-normal break-all">
                {transactionDetails?.data?.transactionHash ? (
                  <a
                    href={`https://filecoin-testnet.blockscout.com/tx/${transactionDetails.data.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {transactionDetails.data.transactionHash}
                  </a>
                ) : (
                  "N/A"
                )}
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimingModal;
