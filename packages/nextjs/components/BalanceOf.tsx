import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import * as shareTokenJson from "./assets/share_token.json";
import { useAccount, useContractRead } from "wagmi";

export function BalanceOf({ selectedAddress }: { selectedAddress: string }) {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();

  const { data } = useContractRead({
    chainId: targetNetwork.id,
    address: selectedAddress,
    abi: shareTokenJson.abi,
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const balance = typeof data !== "undefined" && !isNaN(Number(data)) ? Number(data) / 10 ** 18 : 0;

  return String(balance);
}
