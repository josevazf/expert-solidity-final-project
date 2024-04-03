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
    </>
  );
};
