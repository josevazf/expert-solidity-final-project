import { useState } from "react";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const CreateStartup = () => {
  //const [address, setAddress] = useState("");
  const [startupId, setStartupId] = useState<string | bigint>("");
  const [startupName, setStartupName] = useState<string>();
  const [startupSymbol, setStartupSymbol] = useState<string>();
  const [startupShareCount, setStartupShareCount] = useState<string | bigint>("");
  const [startupPricePShare, setStartupPricePShare] = useState<string | bigint>("");

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StartupFactory",
    functionName: "createStartup",
    args: [BigInt(startupId), startupName, startupSymbol, BigInt(startupShareCount), BigInt(startupPricePShare)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <h2 className="font-bold m-2">Create Startup</h2>
      <IntegerInput
        value={startupId}
        onChange={updatedStartupId => {
          setStartupId(updatedStartupId);
        }}
        placeholder="Choose Startup ID"
      />
      <InputBase name="startupName" placeholder="Share name" value={startupName} onChange={setStartupName} />
      <InputBase name="startupSymbol" placeholder="Share symbol" value={startupSymbol} onChange={setStartupSymbol} />
      <IntegerInput
        value={startupShareCount}
        onChange={updatedStartupShareCount => {
          setStartupShareCount(updatedStartupShareCount);
        }}
        placeholder="Share count"
      />
      <IntegerInput
        value={startupPricePShare}
        onChange={updatedStartupPricePShare => {
          setStartupPricePShare(updatedStartupPricePShare);
        }}
        placeholder="Price ETH/Share"
      />

      <button className="btn btn-primary h-[2.2rem] min-h-[2.2rem]" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
      </button>
    </>
  );
};
