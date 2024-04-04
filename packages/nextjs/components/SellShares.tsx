import * as React from "react";
import { useState } from "react";
import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import { BalanceOf } from "./BalanceOf";
import { GetNativeTokenPrice } from "./GetNativeTokenPrice";
import { GetSharePrice } from "./GetSharePrice";
import { GetStartupAddress } from "./GetStartupAddresses";
import { GetSymbol } from "./GetSymbol";
import * as shareTokenJson from "./assets/shareTokenABI.json";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

export const SellShares = ({ selectedAddress }: { selectedAddress: string }) => {
  const [amountSharesSell, setAmountSharesSell] = useState<string | bigint>("");
  const writeTx = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const [currentSelectedAddress, setSelectedAddress] = useState(selectedAddress);
  const receiveValueNative =
    Number(amountSharesSell) *
    (GetSharePrice({ selectedAddress: currentSelectedAddress }) /
      GetNativeTokenPrice({ selectedAddress: currentSelectedAddress }));
  const toReceive = !isNaN(receiveValueNative) ? receiveValueNative : 0;
  const payValueUSD =
    (Number(amountSharesSell) * GetSharePrice({ selectedAddress: currentSelectedAddress })) / 10 ** 10;
  console.log("VALUE", toReceive / 10 ** 10);

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useContractWrite({
    chainId: targetNetwork.id,
    address: currentSelectedAddress,
    abi: shareTokenJson.abi,
    functionName: "sellShares",
    args: [parseEther(amountSharesSell.toString())],
  });

  const handleSell = async () => {
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
        <InputBase
          name="amountOfSharesBuy"
          placeholder={`${BalanceOf({ selectedAddress: currentSelectedAddress })} available to sell`}
          value={amountSharesSell}
          onChange={setAmountSharesSell}
        />
        <GetStartupAddress setSelectedAddress={setSelectedAddress} />
      </div>
      <p className="">Amount to be received</p>
      <div className="flex flex-row justify-between relative">
        <input type="number" placeholder={`${(toReceive / 10 ** 10).toString()}`} className="w-full" disabled />
        <select
          name="payment"
          id="payment"
          className=" bg-white rounded border-black m-2 p-1 absolute right-0 top-1"
          disabled
        >
          <option value="eth">ETH</option>
          <option value="usdc">USDC</option>
        </select>
      </div>
      <div className="flex flex-row justify-between relative">
        <input
          className="w-full"
          type="text"
          placeholder={`You are selling ${amountSharesSell} ${GetSymbol({
            selectedAddress: currentSelectedAddress,
          })} for ${payValueUSD} USD.`}
          disabled
        />
        <button className="btn btn-sm btn-secondary font-light bg-white text-black rounded m-2 absolute right-0">
          Details
        </button>
      </div>
      <button
        className="btn btn-primary font-light text-white rounded w-full mt-4"
        onClick={handleSell}
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Start Selling</>}
      </button>
    </>
  );
};
