import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/Context";

export const metadata = {
  title: "HashCase - Adding Real World Utilities For NFTs",
  description:
    "Bridging your real and virtual world with HashCase. Making web3 adoption effortless for users, helping brands get web3 ready.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
