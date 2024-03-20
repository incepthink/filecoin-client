import { ethers } from "ethers";
import {
  PaymasterMode,
  createSmartAccountClient,
} from "@biconomy/account";
import ContractABI from "../library/ABI1155.json";

const bundlerUrl =
  "https://bundler.biconomy.io/api/v2/137/dewj2189.wh1289hU-7E49-45ic-af80-gmVDofY9X";

const claimWithBiconomy = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://polygon-mainnet.infura.io/v3/01f9aa2ee79449a69f4df21b7ee0b72a"
  );
  const signer = new ethers.Wallet(process.env.HASHCASE_PRIVATE_KEY, provider);

  const biconomySmartAccountConfig = {
    signer,
    biconomyPaymasterApiKey: process.env.BICONOMY_API,
    bundlerUrl,
    chainId: 137,
  };

  const smartWallet = await createSmartAccountClient(
    biconomySmartAccountConfig
  );

  const smartAccountAddress = await smartWallet.getAccountAddress();
  console.log("Smart Account Address", smartAccountAddress);

  const contractInstance = new ethers.Contract(
    "0x4fc7556b9da50278be434e4b3cb016d08ff4a707",
    ContractABI,
    signer
  );

  const populatedTransaction =
    await contractInstance.safeTransferFrom.populateTransaction(
      "0xDb8F34eb2304d18A60c53D19cD18D6274935daEE",
      "0x66A6E5e6C48aa15661C72047dec2f2f9E2137f99",
      1,
      1,
      "0x"
    );
  console.log("populatedTransaction", populatedTransaction);

  const tx = {
    data: populatedTransaction.data,
    to: "0x4fc7556b9da50278be434e4b3cb016d08ff4a707",
  };

  console.log(tx);

  const userOp = await smartWallet.buildUserOp([tx], {
    paymasterServiceData: {
      mode: PaymasterMode.SPONSORED,
    },
  });
  console.log("UserOp", userOp);

  // let paymasterServiceData = {
  //   mode: PaymasterMode.SPONSORED,
  //   calculateGasLimits: true,
  // };

  // const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(
  //   userOp,
  //   paymasterServiceData
  // );

  // userOp.paymasterAndData = paymasterAndDataResponse.paymasterAndData;
  // console.log("UserOp", userOp);

  // const userOpResponse = await smartWallet.sendUserOp(userOp);

  // console.log("UserOp response", userOpResponse);
  // const { transactionHash } = await userOpResponse.waitForTxHash();
  // console.log("Transaction Hash", transactionHash);
  // const userOpReceipt = await userOpResponse.wait();
  // console.log("UserOp receipt", userOpReceipt);
  // if (userOpReceipt.success == "true") {
  //   console.log("UserOp receipt", userOpReceipt);
  //   console.log("Transaction receipt", userOpReceipt.receipt);
  // }

  //   await biconomy.init();
  //   const provider = biconomy.provider;
  //   const contractInstance = new ethers.Contract(
  //     contract_address,
  //     NFTABI,
  //     biconomy.ethersProvider
  //   );
  //   console.log("contract instance", contractInstance);
  //   console.log("userAddress", userAddress);
  //   const { data } = await contractInstance.populateTransaction.userMint(
  //     tokenIdForTransfer
  //   );
  //   let txParams = {
  //     data: data,
  //     to: contract_address,
  //     from: userAddress,
  //     signatureType: "EIP712_SIGN",
  //   };

  //   console.log(
  //     "token Id for transfer",
  //     tokenIdForTransfer,
  //     " txParams",
  //     txParams
  //   );
  //   const res = await provider.send("eth_sendTransaction", [txParams]);
  //   console.log(res);

  //   biconomy.on("txHashGenerated", (data) => {
  //     console.log(data);
  //   });

  //   biconomy.on("txMined", (data) => {
  //     console.log(data);
  //     setIsLoading(false);
  //     setTransactionHash(data.hash);
  //     setIsNftClaimedToWallet(true);
  //     notify("NFT claimed successfully!", "success");
  //   });

  //   biconomy.on("onError", (data) => {
  //     console.log(data);
  //     notify(data, "error");
  //     setIsLoading(false);
  //   });

  //   biconomy.on("txHashChanged", (data) => {
  //     console.log(data);
  //   });
};

export default claimWithBiconomy;
