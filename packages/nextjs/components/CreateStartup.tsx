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
      <div>
        <h1 className="text-2xl font-bold py-5">Create Startup</h1>
      </div>
      <div>
        <p className="text">Name of Startup</p>
        <InputBase name="startupName" placeholder="Name of Startup" value={startupName} onChange={setStartupName} />
      </div>
      <div>
        <p className="text">Symbol</p>
        <InputBase name="startupSymbol" placeholder="SYMBL" value={startupSymbol} onChange={setStartupSymbol} />
      </div>
      <div>
        <p className="text">Total Shares</p>
        <InputBase
          name="startupShareCount"
          placeholder="1000"
          value={startupShareCount}
          onChange={setStartupShareCount}
        />
      </div>
      <div>
        <p className="text">Price per Share</p>
        <InputBase
          name="startupPricePShare"
          placeholder="10 USD"
          value={startupPricePShare}
          onChange={setStartupPricePShare}
        />
      </div>
      <button
        className="btn btn-primary font-light text-white rounded w-full mt-4"
        onClick={() => writeAsync()}
        disabled={isLoading}
      >
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Create Startup</>}
      </button>
    </>
  );
};
