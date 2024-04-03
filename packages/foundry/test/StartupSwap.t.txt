// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {StartupFactory} from "../contracts/StartupFactory.sol";
import {StartupSwap} from "../contracts/StartupSwap.sol";

contract StartupSwapTest is Test {
    StartupFactory factory;
    StartupSwap swap;
    address deployer;
    address startupOwner;
    address investor;

    function setUp() public {
        deployer = address(this);
        startupOwner = address(0x1);
        investor = address(0x2);

        vm.startPrank(deployer);

        // Deploy the implementation contract
        swap = new StartupSwap();

        // Deploy the factory contract with the implementation address
        factory = new StartupFactory(address(swap));

        factory.addStartupOwner(startupOwner);
        vm.stopPrank();
        // Assume factory is granted STARTUP_OWNER_ROLE outside of this test setup
    }

    function testCreateStartup() public {
        vm.startPrank(startupOwner);

        // Create a new startup through the factory
        address payable cloneAddr = factory.createStartup(
            1, // startupId
            "Test Startup", // name
            "TST", // symbol
            1000 * 1e18, // amount
            1 ether // price per share
        );

        StartupSwap clone = StartupSwap(cloneAddr);

        assertEq("Test Startup", clone.name());

        assertEq("TST", clone.symbol());

        assertEq(
            factory.getStartupByOwner(),
            cloneAddr,
            "Startup should be created and owned by the startup owner"
        );

        assertEq(
            clone.owner(),
            startupOwner,
            "The clone's owner should be the startup owner"
        );

        // Additional assertions can be made here regarding token name, symbol, etc.
        vm.stopPrank();
    }

    function testBuyShares() public {
        // Setup similar to testCreateStartup
        vm.prank(startupOwner);
        address payable cloneAddr = factory.createStartup(
            1, // startupId
            "Test Startup", // name
            "TST", // symbol
            1000 * 1e18, // amount
            1 ether // price per share
        );
        // investor buys shares
        vm.deal(investor, 5 ether);
        vm.startPrank(investor);

        StartupSwap(cloneAddr).buyShares{value: 5 ether}();

        assertEq(
            StartupSwap(cloneAddr).balanceOf(investor), 5, "Results not equal"
        );

        vm.stopPrank();
    }

    // Add more tests, e.g., for sellShares, minting by owner, pausing the contract, etc.
}
