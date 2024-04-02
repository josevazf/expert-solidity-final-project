import { useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const GetStartupAddresses = () => {
  const { data: getStartupAddresses, isLoading: isStartupAddressesLoading } = useScaffoldContractRead({
    contractName: "StartupFactory",
    functionName: "getStartupAddresses",
    watch: true,
  });

  // Check if the getStartupAddresses is defined and split the string into an array
  const addressesArray = getStartupAddresses ? getStartupAddresses.toString().split(",") : [];

  // State variable to store the selected address
  const [selectedAddress, setSelectedAddress] = useState("");

  // Function to handle change in selected address
  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div>
      <h2 className="font-bold m-0">Created Contracts:</h2>
      {isStartupAddressesLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {addressesArray.length > 0 ? (
            <select value={selectedAddress} onChange={handleAddressChange}>
              <option value="">Select an address</option>
              {addressesArray.map((address, index) => (
                <option key={index} value={address}>
                  {address}
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
