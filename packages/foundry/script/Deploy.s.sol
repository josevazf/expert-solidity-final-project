//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/StartupFactory.sol";
import "../contracts/StartupSwap.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
        vm.startBroadcast(vm.envUint("DEPLOYER_PRIVATE_KEY"));
	    // Deploy the implementation contract
        StartupSwap swap = new StartupSwap();

        //address oracle = vm.envAddress(findChainName());
        
        //console.logString(oracle);

        // Deploy the factory contract with the implementation address
        StartupFactory factory = new StartupFactory(address(swap), 0x694AA1769357215DE4FAC081bf1f309aDC325306);

        console.logString(
            string.concat(
                "YourContract deployed at: ", vm.toString(address(factory))
            )
        );

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();
    }

    function test() public {}
}
