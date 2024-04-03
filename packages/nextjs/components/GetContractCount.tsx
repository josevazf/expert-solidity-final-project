import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export function GetContractCount() {
  const { data: contractCount } = useScaffoldContractRead({
    contractName: "StartupFactory",
    functionName: "contractCount",
    watch: true,
  });

  return (contractCount ?? 0).toString();
}
