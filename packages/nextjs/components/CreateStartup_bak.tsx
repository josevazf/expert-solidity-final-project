import { useState } from "react";
import { GetContractCount } from "./GetContractCount";
import { parseEther } from "viem";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const CreateStartup = () => {
  //const [address, setAddress] = useState("");
  const [startupName, setStartupName] = useState<string>();
  const [startupSymbol, setStartupSymbol] = useState<string>();
  const [startupShareCount, setStartupShareCount] = useState<string | bigint>("");
  const [startupPricePShare, setStartupPricePShare] = useState<string | bigint>("");

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StartupFactory",
    functionName: "createStartup",
    args: [
      BigInt(GetContractCount()) + 1n,
      startupName,
      startupSymbol,
      parseEther(startupShareCount.toString()),
      parseEther(startupPricePShare.toString()),
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <h2 className="font-bold m-2">Create Startup</h2>
      <InputBase name="startupName" placeholder="Share name" value={startupName} onChange={setStartupName} />
      <InputBase name="startupSymbol" placeholder="Share symbol" value={startupSymbol} onChange={setStartupSymbol} />
      <InputBase
        name="startupShareCount"
        placeholder="Share count"
        value={startupShareCount}
        onChange={setStartupShareCount}
      />
      <InputBase
        name="startupPricePShare"
        placeholder="Price USD/Share"
        value={startupPricePShare}
        onChange={setStartupPricePShare}
      />
      <button className="btn btn-primary h-[2.2rem] min-h-[2.2rem]" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
      </button>
    </>
  );
};
