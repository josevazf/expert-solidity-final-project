import { useTargetNetwork } from "../hooks/scaffold-eth/useTargetNetwork";
import * as shareTokenJson from "./assets/shareTokenABI.json";
import { useContractRead } from "wagmi";

export function GetShareName({ selectedAddress }: { selectedAddress: string }) {
  const { targetNetwork } = useTargetNetwork();

  const { data } = useContractRead({
    chainId: targetNetwork.id,
    address: selectedAddress,
    abi: shareTokenJson.abi,
    functionName: "name",
    args: [],
    watch: true,
  });

  const name = typeof data === "string" ? data : "-";

  return name;
}
