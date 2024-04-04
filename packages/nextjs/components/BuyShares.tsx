import * as React from "react";
import { useState } from "react";
import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import { GetNativeTokenPrice } from "./GetNativeTokenPrice";
import { GetSharePrice } from "./GetSharePrice";
import { GetStartupAddress } from "./GetStartupAddresses";
import * as shareTokenJson from "./assets/shareTokenABI.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const BuyShares = ({ selectedAddress }: { selectedAddress: string }) => {
  const [amountSharesBuy, setAmountSharesBuy] = useState<string | bigint>("");
  const writeTx = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const [currentSelectedAddress, setSelectedAddress] = useState(selectedAddress);
  const payValue =
    Number(amountSharesBuy) *
    (GetSharePrice({ selectedAddress: currentSelectedAddress }) /
      GetNativeTokenPrice({ selectedAddress: currentSelectedAddress }));
  const toPay = !isNaN(payValue) ? payValue : 0;
  console.log("VALUE", toPay / 10 ** 10);

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useContractWrite({
    chainId: targetNetwork.id,
    address: currentSelectedAddress,
    abi: shareTokenJson.abi,
    functionName: "buyShares",
    value: parseEther((toPay / 10 ** 10).toString()),
    args: [],
  });

  const handleBuy = async () => {
    try {
      await writeTx(writeAsync, {
        onBlockConfirmation: txnReceipt => {
          console.log("📦 Transaction blockHash", txnReceipt.blockHash);
        },
      });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  const [activeBuyDetails, setActiveBuyDetails] = useState(false);

  const handleActiveBuyDetails = () => setActiveBuyDetails(!activeBuyDetails);

  return (
    <>
      {/* <input type="number" placeholder="0" className="w-full bg-white rounded border-primary" /> */}
      <div className="flex flex-row justify-between relative">
        <InputBase name="amountOfSharesBuy" placeholder="100" value={amountSharesBuy} onChange={setAmountSharesBuy} />
        <GetStartupAddress setSelectedAddress={setSelectedAddress} />
      </div>
      <p className="">Payment</p>
      <div className="flex flex-row justify-between relative">
        <input type="number" placeholder="1000" className="w-full" />
        <select name="payment" id="payment" className=" bg-white rounded border-black m-2 p-1 absolute right-0 top-1">
          <option value="eth">ETH</option>
          <option value="usdc">USDC</option>
        </select>
      </div>
      <div className="flex flex-row justify-between relative">
        <input className="w-full" type="text" placeholder="You are buying 1′000 DAKS for 13′230.8 XCHF." disabled />
        <button
          className="btn btn-sm btn-secondary font-light bg-white text-black rounded m-2 absolute right-0"
          onClick={handleActiveBuyDetails}
        >
          Details
        </button>
      </div>
      <button
        className="btn btn-primary font-light text-white rounded w-full mt-4"
        onClick={handleBuy}
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Start Buying</>}
      </button>
      {activeBuyDetails && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-xl p-6 w-[580px] h-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold text-black">Details</h1>
              <p onClick={handleActiveBuyDetails}>X</p>
            </div>
            <div className="bg-gray-200 my-4 p-4">
              <span className="flex justify-between">
                <p className="text-black text-sm">Trade Type</p>
                <p className="text-black text-sm">BUY</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">Amount of Shares</p>
                <p className="text-black text-sm">1000</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">Price per Share</p>
                <p className="text-black text-sm">1 ETH</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">Total Share Price</p>
                <p className="text-black text-sm">1000 ETH</p>
              </span>
            </div>
            <div className="bg-gray-200 my-4 p-4">
              <span className="flex justify-between">
                <p className="text-black text-sm">Brokerbot Contract</p>
                <p className="text-black text-sm">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">DAKS Contract</p>
                <p className="text-black text-sm">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">XCHF Contract</p>
                <p className="text-black text-sm">0x...</p>
              </span>
              <span className="flex justify-between">
                <p className="text-black text-sm">Payment Hub Contract</p>
                <p className="text-black text-sm">0x...</p>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
