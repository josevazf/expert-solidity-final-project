import * as React from "react";
import { useState } from "react";
import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import * as shareTokenJson from "./assets/share_token.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const BuyShares = ({ selectedAddress }: { selectedAddress: string }) => {
  const [amountSharesBuy, setAmountSharesBuy] = useState<string>();
  const writeTx = useTransactor();
  const { targetNetwork } = useTargetNetwork();

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useContractWrite({
    chainId: targetNetwork.id,
    address: selectedAddress,
    abi: shareTokenJson.abi,
    functionName: "buyShares",
    value: parseEther(amountSharesBuy?.toString() ?? ""),
    args: [],
  });

  const handleSetGreeting = async () => {
    try {
      await writeTx(writeAsync, { blockConfirmations: 1 });
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <>
      <InputBase name="amountOfSharesBuy" placeholder="0.0" value={amountSharesBuy} onChange={setAmountSharesBuy} />
      <button className="btn btn-primary h-[2.2rem] min-h-[2.2rem]" onClick={handleSetGreeting} disabled={isLoading}>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>
            Buy <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
          </>
        )}
      </button>
    </>
  );
};
