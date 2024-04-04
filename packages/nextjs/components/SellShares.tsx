import * as React from "react";
import { useState } from "react";
import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import * as shareTokenJson from "./assets/shareTokenABI.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const SellShares = ({ selectedAddress }: { selectedAddress: string }) => {
  const [amountSharesSell, setAmountSharesSell] = useState<string>();
  const writeTx = useTransactor();
  const { targetNetwork } = useTargetNetwork();

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useContractWrite({
    chainId: targetNetwork.id,
    address: selectedAddress,
    abi: shareTokenJson.abi,
    functionName: "sellShares",
    args: [parseEther(amountSharesSell?.toString() ?? "")],
  });

  const handleSetGreeting = async () => {
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

  const [activeSellDetails, setActiveSellDetails] = useState(false);

  const handleActiveSellDetails = () => setActiveSellDetails(!activeSellDetails);

  return (
    <>
      <InputBase name="amountOfSharesSell" placeholder="0.0" value={amountSharesSell} onChange={setAmountSharesSell} />
      <button className="btn btn-primary h-[2.2rem] min-h-[2.2rem]" onClick={handleSetGreeting} disabled={isLoading}>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            Sell <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
          </>
        )}
      </button>
      {activeSellDetails && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-xl p-6 w-[580px] h-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-bold text-black">Details</h1>
              <p onClick={handleActiveSellDetails}>X</p>
            </div>
            <div className="bg-gray-200 my-4 p-4">
              <span className="flex justify-between">
                <p className="text-black text-sm">Trade Type</p>
                <p className="text-black text-sm">SELL</p>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
