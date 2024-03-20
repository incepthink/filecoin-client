import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HashCase - Adding Real World Utilities For NFTs",
  description:
    "Bridging your real and virtual world with HashCase. Making web3 adoption effortless for users, helping brands get web3 ready.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
