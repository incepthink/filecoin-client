/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API: process.env.API,
    MAGICLINK_PUBLISHABLE_KEY: process.env.MAGICLINK_PUBLISHABLE_KEY,
    COLLECTION_ID: process.env.COLLECTION_ID,
    HASHCASE_PRIVATE_KEY: process.env.HASHCASE_PRIVATE_KEY,
    FVM_PRIVATE_KEY: process.env.FVM_PRIVATE_KEY,
    FVM_NFT_CONTRACT_ADDRESS: process.env.FVM_NFT_CONTRACT_ADDRESS,
  },
  rewrites: async () => [
    {
      source: "/backend/:path*",
      destination: `${process.env.API}/:path*`,
    },
    {
      source: "/frontend/:path*",
      destination: "http://localhost:3000/:path*",
    },
  ],
};

export default nextConfig;
