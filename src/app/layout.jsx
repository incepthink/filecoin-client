import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/Context";
import Web3Providers from "@/providers/Web3Providers";

export const metadata = {
  title: "HashCase - Adding Real World Utilities For NFTs",
  description:
    "Bridging your real and virtual world with HashCase. Making web3 adoption effortless for users, helping brands get web3 ready.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Providers>
          <StoreProvider>{children}</StoreProvider>
        </Web3Providers>
      </body>
    </html>
  );
}
