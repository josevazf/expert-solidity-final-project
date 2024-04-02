import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const GetContractCount = () => {
  const { data: contractCount, isLoading: isContractCountLoading } = useScaffoldContractRead({
    contractName: "StartupFactory",
    functionName: "contractCount",
    watch: true,
  });

  return (
    <div>
      <h2 className="font-bold m-0">Total Contract Count:</h2>
      {isContractCountLoading ? "Loading..." : <p>{contractCount ? contractCount.toString() : 0}</p>}
    </div>
  );
};
