"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import "@rainbow-me/rainbowkit/styles.css";

// Filecoin Mainnet chain configuration (chainId: 314)
const filecoinMainnet = {
  id: 314,
  name: "Filecoin Mainnet",
  nativeCurrency: {
    name: "Filecoin",
    symbol: "FIL",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        process.env.NEXT_PUBLIC_FILECOIN_RPC_URL ||
          "https://api.node.glif.io/rpc/v1",
      ],
    },
    public: {
      http: ["https://api.node.glif.io/rpc/v1"],
    },
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://filfox.info/en",
    },
  },
};

// Create wagmi config with RainbowKit defaults
const config = getDefaultConfig({
  appName: "HashCase",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [filecoinMainnet],
  transports: {
    [filecoinMainnet.id]: http(
      process.env.NEXT_PUBLIC_FILECOIN_RPC_URL ||
        "https://api.node.glif.io/rpc/v1"
    ),
  },
  ssr: true,
});

// Create query client for React Query
const queryClient = new QueryClient();

export default function Web3Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={filecoinMainnet}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Export the chain config for use elsewhere
export { filecoinMainnet, config };
