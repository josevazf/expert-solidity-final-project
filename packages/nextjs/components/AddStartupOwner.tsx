import { useState } from "react";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const AddStartupOwner = () => {
  const [address, setAddress] = useState("");

  // Use the useScaffoldContractWrite hook to write to the contract
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "StartupFactory",
    functionName: "addStartupOwner",
    args: [address], // Pass the value of the address state variable instead of the state setter function
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <h2 className="font-bold m-2">Set new Startup owner:</h2>
      <AddressInput placeholder="New startup owner address" value={address} onChange={setAddress} />

      <button className="btn btn-primary h-[2.2rem] min-h-[2.2rem]" onClick={() => writeAsync()} disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Send</>}
      </button>
    </>
  );
};
