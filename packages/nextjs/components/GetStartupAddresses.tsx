import { useState } from "react";
import { GetSymbol } from "./GetSymbol";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const GetStartupAddress = ({
  setSelectedAddress,
}: {
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: getStartupAddresses, isLoading: isStartupAddressesLoading } = useScaffoldContractRead({
    contractName: "StartupFactory",
    functionName: "getStartupAddresses",
    watch: true,
  });

  // Check if the getStartupAddresses is defined and split the string into an array
  const addressesArray = getStartupAddresses ? getStartupAddresses.toString().split(",") : [];

  // State variable to store the selected address
  const [selectedAddressState, setSelectedAddressState] = useState("");

  // Function to handle change in selected address
  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddressState(event.target.value);
    setSelectedAddress(event.target.value);
  };

  return (
    <div>
      {isStartupAddressesLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {addressesArray.length > 0 ? (
            <select
              value={selectedAddressState}
              onChange={handleAddressChange}
              className=" bg-white rounded border-black m-2 p-1 absolute right-0 top-1"
            >
              <option value="">Token</option>
              {addressesArray.map((address, index) => (
                <option key={index} value={address}>
                  <GetSymbol selectedAddress={address}></GetSymbol>
                </option>
              ))}
            </select>
          ) : (
            <p>No Contracts where found...</p>
          )}
        </div>
      )}
    </div>
  );
};
