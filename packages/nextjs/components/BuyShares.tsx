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
        <button className="btn btn-sm btn-secondary font-light bg-white text-black rounded m-2 absolute right-0">
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
    </>
  );
};
