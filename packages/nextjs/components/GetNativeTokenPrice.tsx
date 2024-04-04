import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import * as shareTokenJson from "./assets/shareTokenABI.json";
import { useContractRead } from "wagmi";

export function GetNativeTokenPrice({ selectedAddress }: { selectedAddress: string }) {
  const { targetNetwork } = useTargetNetwork();

  const { data } = useContractRead({
    chainId: targetNetwork.id,
    address: selectedAddress,
    abi: shareTokenJson.abi,
    functionName: "getUSDPrice",
    args: [],
    watch: true,
  });

  const balance = typeof data !== "undefined" && !isNaN(Number(data)) ? Number(data) / 10 ** 8 : 0;

  return balance;
}
