//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/StartupFactory.sol";
import "../contracts/StartupSwap.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    function run() external {
/*         uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        } */
        vm.startBroadcast(vm.envUint("DEPLOYER_PRIVATE_KEY"));

		        // Deploy the implementation contract
        StartupSwap swap = new StartupSwap();

        // Deploy the factory contract with the implementation address
        StartupFactory factory = new StartupFactory(address(swap));

        console.logString(
            string.concat(
                "YourContract deployed at: ", vm.toString(address(factory))
            )
        );
/*        YourContract yourContract =
            new YourContract(vm.addr(deployerPrivateKey));
        console.logString(
            string.concat(
                "YourContract deployed at: ", vm.toString(address(yourContract))
            )
        ); */
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
