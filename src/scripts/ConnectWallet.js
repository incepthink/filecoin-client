/**
 * @deprecated This file is deprecated. Use the useWalletAuth hook instead.
 * The wallet connection logic has been migrated to wagmi/viem/RainbowKit.
 * See: src/hooks/useWalletAuth.js
 *
 * This file is kept for reference only.
 */

// Legacy implementation - DO NOT USE
// The new implementation uses:
// - wagmi for wallet connection and chain switching
// - viem for message signing
// - RainbowKit for the connection modal UI
// - @tanstack/react-query for state management
//
// Import the new hook in your component:
// import { useWalletAuth } from "@/hooks/useWalletAuth";

export default function connectWallet() {
  console.warn(
    "connectWallet() is deprecated. Use the useWalletAuth hook instead."
  );
  throw new Error(
    "connectWallet() is deprecated. Use the useWalletAuth hook from @/hooks/useWalletAuth instead."
  );
}
