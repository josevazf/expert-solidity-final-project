// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@chainlink/interfaces/feeds/AggregatorV3Interface.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

/**
 * Network: Sepolia
 * Aggregator: ETH/USD
 * Address: 0x694AA1769357215DE4FAC081bf1f309aDC325306
 * 
 * Network: Mumbai Testnet
 * Aggregator: MATIC/USD
 * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
 */

contract StartupSwap is ERC20Upgradeable {
    uint256 public startupId;
    uint256 public totalShareCount;
    uint256 public pricePerShare;
    address public owner;
    AggregatorV3Interface private oracle;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        uint256 _startupId,
        string memory _name,
        string memory _symbol,
        address _owner,
        uint256 _totalShareCount,
        uint256 _pricePerShare,
        address _oracleImplementation
    ) public initializer {
        __ERC20_init(_name, _symbol);
        startupId = _startupId;
        pricePerShare = _pricePerShare;
        owner = _owner;
        oracle = AggregatorV3Interface(_oracleImplementation);
        totalShareCount = _totalShareCount;
        _mint(address(this), totalShareCount);
    }

    function getUSDPrice() public view returns (uint256) {
        (,int256 answer,,,) = oracle.latestRoundData();
        return uint256(answer);
    }

    function mint(address to, uint256 _totalShareCount) public {
        require(msg.sender == owner, "Only the owner can mint");
        _mint(to, _totalShareCount);
    }

    function buyShares() public payable {
        require(msg.value > 0, "Must send ETH to buy shares");
        uint256 sharesToBuy = ((msg.value * getUSDPrice()) / pricePerShare) * 10**10;
        require(
            sharesToBuy <= balanceOf(address(this)),
            "Not enough shares available"
        );
        _transfer(address(this), msg.sender, sharesToBuy);
    }

    function sellShares(uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient shares");
        _transfer(msg.sender, address(this), _amount);
        uint256 nativeTokenToTransfer = (_amount * pricePerShare) /
            (getUSDPrice() * 10**10);
        payable(msg.sender).transfer(nativeTokenToTransfer);
    }

    receive() external payable {
        revert("StartupSwap does not accept ETH directly");
    }

    function ownerWithdrawETH() external {
        require(msg.sender == owner, "Only the owner can withdraw ETH");
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        require(ok, "Failed to withdraw");
    }
}
