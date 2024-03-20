import { StoreContext } from "@/Context";
import connectWallet from "@/scripts/ConnectWallet";
import loginWithMagic from "@/scripts/MagicLogin";
import Cookies from "js-cookie";
import { useContext } from "react";

const AuthModal = ({ showModal, setShowModal }) => {
  const { state, dispatch } = useContext(StoreContext);

  if (!showModal) return null;

  const handleGoogleLogin = async () => {
    loginWithMagic();
  };

  const handleMetamaskConnectWallet = async () => {
    const { user, jwt } = await connectWallet();
    if (user !== null) {
      dispatch({ type: "SET_USER", payload: user });
      setShowModal(false);
    }
    if (jwt != null) {
      dispatch({ type: "SET_JWT", payload: jwt });
    }
  };

  const handleLogout = async () => {
    Cookies.remove("user");
    Cookies.remove("jwt");
    location.reload();
  };

  return (
    <div className="absolute w-full h-full z-20 backdrop-blur-sm bg-white/40 flex justify-center items-center">
      <div className="w-full md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-fit relative bg-white border-2 border-black rounded-md m-1">
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-600 hover:text-gray-800 transition ease-in-out duration-150 absolute font-black top-2 right-2 px-3 py-1 rounded xl"
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
        <h1 className="text-center text-3xl font-bold py-4 mt-8">
          {state.user ? "Switch Accounts" : "Welcome to HashCase!"}
        </h1>
        <div className="flex flex-col w-full items-center justify-center gap-y-6 p-6">
          <button
            className="w-full flex justify-center items-center gap-x-6 text-black border-1 border-black font-bold py-3 rounded-md"
            onClick={handleGoogleLogin}
          >
            <img
              src="/images/google_logo.svg"
              alt="google_logo"
              className="w-6 h-6"
            />
            Continue with Google
          </button>
          <button
            className="w-full flex justify-center items-center gap-x-6 text-black font-bold border-1 border-black rounded-md"
            onClick={handleMetamaskConnectWallet}
          >
            <img
              src="/images/metamask_logo.png"
              alt="metamask_logo"
              className="h-12"
            />
            Connect With Metamask
          </button>
          {state.user ? (
            <button
              className="w-full flex justify-center items-center gap-x-6 text-white bg-primary font-bold rounded-md py-2.5"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
