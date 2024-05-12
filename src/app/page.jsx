"use client";

import {
  useEffect,
  useState,
  Suspense,
  lazy,
  useMemo,
  useContext,
} from "react";
import Cookies from "js-cookie";
import { returnShortAddress } from "@/scripts/utils";
import claimNFT from "@/scripts/ClaimNFT";
import ClaimingModal from "@/components/modals/ClaimingModal";
import AuthModal from "@/components/modals/AuthModal";
import MyNFTsModal from "@/components/modals/MyNFTsModal";
import ReactConfetti from "react-confetti";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NFTDetailsForm from "@/components/NFTDetailsForm";
import NFTCard from "@/components/NFTCard";
import { StoreContext } from "@/Context";
import MyOrdersModal from "@/components/modals/MyOrdersModal";
import { useRouter } from "next/navigation";

const Home = () => {
  const { state, dispatch } = useContext(StoreContext);
  const router = useRouter();

  const [showMyNFTs, setShowMyNFTs] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const [showMyOrdersModal, setShowMyOrdersModal] = useState(false);

  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(Cookies.get("user")),
      });
    }
    if (Cookies.get("jwt")) {
      dispatch({
        type: "SET_JWT",
        payload: Cookies.get("jwt"),
      });
    }
  }, []);

  const handleMyOrdersClick = () => {
    if (!state.user) {
      setShowAuthModal(true);
      return;
    }
    setShowMyOrdersModal(true);
  };

  const handleMyNFTsClick = () => {
    if (!state.user) {
      setShowAuthModal(true);
      return;
    }
    router.push(
      `/profile/${state.user.wallet_address || state.user.magic_wallet}`
    );
  };

  const handleConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setRecycleConfetti(false);
    }, 2000);
    setTimeout(() => {
      setShowConfetti(false);
      setRecycleConfetti(true);
    }, 5000);
  };

  const claimHandler = async () => {
    if (!state.user) {
      setShowAuthModal(true);
      return;
    }
    setTransactionDetails(null);
    setLoading(true);
    const response = await claimNFT(state);
    console.log(response);
    if (response.success) {
      handleConfetti();
    }
    setTransactionDetails(response);
  };

  return (
    <div className="max-w-screen h-svh w-full text-black bg-cover bg-center relative">
      {showConfetti ? (
        <div className="absolute w-full h-full z-30 pointer-events-none">
          {showConfetti && (
            <ReactConfetti
              width={window?.innerWidth}
              height={window?.innerHeight}
              numberOfPieces={100}
              initialVelocityY={{
                min: 10,
                max: 40,
              }}
              recycle={recycleConfetti}
            />
          )}
        </div>
      ) : null}
      <ToastContainer />
      <MyOrdersModal
        showModal={showMyOrdersModal}
        setShowModal={setShowMyOrdersModal}
      />
      <ClaimingModal
        showModal={loading}
        setShowModal={setLoading}
        transactionDetails={transactionDetails}
      />
      <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />
      <MyNFTsModal showModal={showMyNFTs} setShowModal={setShowMyNFTs} />
      <div className="flex md:flex-row flex-col-reverse w-full md:h-svh overflow-y-scroll pb-safe">
        <div className="relative w-full md:w-3/5 lg:w-2/5 h-fit md:h-svh bg-white p-8 md:p-10 md:py-16 flex flex-col md:justify-between">
          <div className="w-full flex flex-col gap-y-4">
            <Image
              src="/images/fvm_logo.png"
              alt="fvm_logo"
              width={656}
              height={208}
              className="hidden md:flex w-[200px]"
            />
          </div>
          <div className="flex flex-col items-center md:items-start h-full w-full gap-y-6 justify-center">
            <NFTDetailsForm />
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-y-4 md:gap-y-6">
            <button
              className="w-full text-white font-bold py-3 bg-primary rounded-md"
              onClick={claimHandler}
            >
              Claim NFT
            </button>
            <a
              href="https://www.hashcase.co"
              target="_blank"
              className="flex items-center justify-center gap-x-2 bg-black text-white text-xs md:text-base lg:text-lg font-semibold p-3 px-6 rounded-xl cursor-pointer"
            >
              <h1>Powered By</h1>
              <Image
                src="/images/hashcase_logo.png"
                alt="hashcase_logo"
                width={1519}
                height={271}
                className="w-[80px] md:w-[100px] lg:w-[150px]"
              />
            </a>
          </div>
        </div>
        <div className="w-full h-fit md:h-full pt-32 md:pt-0 md:relative md:w-2/5 lg:w-3/5 bg-white">
          <div className="flex items-center justify-center w-full h-full z-10 px-4">
            <NFTCard />
          </div>
        </div>
        <div className="p-2 absolute flex flex-wrap items-center justify-center gap-x-2 md:gap-x-6 w-full md:w-fit md:right-2 top-2 z-20 text-sm md:text-base">
          <button
            className="bg-white text-primary font-bold px-6 py-3 rounded-full"
            onClick={handleMyOrdersClick}
          >
            My Orders
          </button>
          <button
            className="bg-white text-primary font-bold px-6 py-3 rounded-full"
            onClick={() => {
              if (!state.user) {
                setShowAuthModal(true);
                return;
              }
              setShowMyNFTs((prev) => !prev);
            }}
          >
            My NFTs
          </button>
          <button
            className="bg-white text-primary font-bold px-6 py-3 rounded-full"
            onClick={handleMyNFTsClick}
          >
            My Profile
          </button>
          <button
            className="bg-primary text-white font-bold px-6 py-3 rounded-full"
            onClick={() => {
              setShowAuthModal((prev) => !prev);
            }}
          >
            <Suspense>
              {state.user
                ? returnShortAddress(
                    state.user.wallet_address || state.user.magic_wallet
                  )
                : "Login"}
            </Suspense>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
