"use client";

import { useCallback, useRef } from "react";
import { useAccount, useSignMessage, useSwitchChain } from "wagmi";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Cookies from "js-cookie";

const FILECOIN_CHAIN_ID = 314;

/**
 * Hook that provides wallet authentication functionality using wagmi/viem.
 * Replaces the old ethers-based connectWallet script while maintaining
 * identical behavior (API calls, cookies, error handling).
 */
export function useWalletAuth() {
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { switchChainAsync } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  // Ref to prevent duplicate auth calls
  const isAuthenticating = useRef(false);

  /**
   * Ensures the wallet is on the correct chain (Filecoin Mainnet, chainId=314).
   * Returns true if successful, false if user rejects or error occurs.
   */
  const ensureCorrectChain = useCallback(async () => {
    if (chainId === FILECOIN_CHAIN_ID) {
      return true;
    }

    try {
      await switchChainAsync({ chainId: FILECOIN_CHAIN_ID });
      return true;
    } catch (error) {
      console.log("Chain switch error:", error);
      // Error code 4902 means chain not added - wagmi/RainbowKit handles this automatically
      // by prompting to add the chain, so if we still get an error, user likely rejected
      return false;
    }
  }, [chainId, switchChainAsync]);

  /**
   * Performs the backend authentication flow:
   * 1. GET https://api.hashcase.co/auth/wallet/request-token/:userAddress -> message, token
   * 2. Sign message with wallet
   * 3. POST https://api.hashcase.co/auth/wallet/login { signature, address, token }
   * 4. Set cookies with ~30 minute expiry
   *
   * Returns { user, jwt } on success, { user: null, jwt: null } on failure.
   */
  const authenticateWithBackend = useCallback(async () => {
    if (!address) {
      console.log("No address available for authentication");
      return { user: null, jwt: null };
    }

    if (isAuthenticating.current) {
      console.log("Authentication already in progress");
      return { user: null, jwt: null };
    }

    isAuthenticating.current = true;

    try {
      // Ensure we're on the correct chain before signing
      const chainOk = await ensureCorrectChain();
      if (!chainOk) {
        alert("Not able to change network");
        return { user: null, jwt: null };
      }

      // GET challenge message from backend
      let response;
      try {
        response = await axios.get(
          `https://api.hashcase.co/auth/wallet/request-token/${address}`
        );
      } catch (axiosError) {
        // Handle 400 status specifically (user already signed)
        if (axiosError.response && axiosError.response.status === 400) {
          console.log("User has already signed message, setting user data directly");

          const responseData = axiosError.response.data;
          if (responseData.userInstance) {
            const userInstance = responseData.userInstance;

            // Normalize user object: map eth_wallet_address to wallet_address for consistency
            const normalizedUser = {
              ...userInstance,
              wallet_address: userInstance.eth_wallet_address,
            };

            // Set cookies with 30 minute expiry
            const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

            Cookies.set("user", JSON.stringify(normalizedUser), {
              expires: inThirtyMins,
            });
            Cookies.set("jwt", "", { expires: inThirtyMins });

            console.log("Authentication successful for existing user!");
            return { user: normalizedUser, jwt: "" };
          }
        }

        // Re-throw if it's not a 400 or doesn't have userInstance
        throw axiosError;
      }

      const message = response.data.message;
      const authToken = response.data.token;

      if (!message || !authToken) {
        throw new Error("Invalid response from auth server - missing message or token");
      }

      // Sign the message using wagmi's signMessage (viem under the hood)
      let signature;
      try {
        signature = await signMessageAsync({ message });
      } catch (signError) {
        console.error("Signing failed:", signError);

        // Handle user rejection specifically
        if (
          signError?.code === 4001 ||
          signError?.message?.includes("User rejected") ||
          signError?.message?.includes("denied")
        ) {
          throw new Error("USER_REJECTED_SIGNATURE");
        }
        throw new Error("Failed to sign message. Please try again.");
      }

      // POST signature, address, and token to login
      const res = await axios.post("https://api.hashcase.co/auth/wallet/login", {
        signature,
        address,
        token: authToken,
      });

      const { user_instance, token } = res.data;

      if (!token || !user_instance) {
        throw new Error("Invalid login response - missing token or user data");
      }

      console.log(user_instance);

      // Normalize user object: map eth_wallet_address to wallet_address for consistency
      const normalizedUser = {
        ...user_instance,
        wallet_address: user_instance.eth_wallet_address,
      };

      // Set cookies with 30 minute expiry (same as original)
      const inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);

      Cookies.set("user", JSON.stringify(normalizedUser), {
        expires: inThirtyMins,
      });
      Cookies.set("jwt", token, { expires: inThirtyMins });

      return { user: normalizedUser, jwt: token };
    } catch (error) {
      console.error("Authentication error:", error);
      return { user: null, jwt: null };
    } finally {
      isAuthenticating.current = false;
    }
  }, [address, ensureCorrectChain, signMessageAsync]);

  /**
   * Opens the RainbowKit connect modal.
   * After connection, the caller should trigger authenticateWithBackend.
   */
  const openConnect = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    }
  }, [openConnectModal]);

  /**
   * Opens the RainbowKit account modal for switching accounts.
   */
  const openAccount = useCallback(() => {
    if (openAccountModal) {
      openAccountModal();
    }
  }, [openAccountModal]);

  return {
    // State
    address,
    isConnected,
    chainId,
    isCorrectChain: chainId === FILECOIN_CHAIN_ID,

    // Actions
    openConnect,
    openAccount,
    authenticateWithBackend,
    ensureCorrectChain,

    // Constants
    FILECOIN_CHAIN_ID,
  };
}

export default useWalletAuth;
