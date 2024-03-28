// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract StartupSwap is ERC20Upgradeable {
    uint256 public amount;
    uint256 public price;
    address public owner;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner,
        uint256 _amount,
        uint256 _price
    ) public initializer {
        __ERC20_init(_name, _symbol);
        _mint(address(this), _amount);
        amount = _amount;
        price = _price;
        owner = _owner;
    }

    function mint(address to, uint256 _amount) public {
        require(msg.sender == owner, "Only the owner can mint");
        _mint(to, _amount);
    }

    function buyShares() public payable {
        require(msg.value > 0, "Must send ETH to buy shares");
        uint256 sharesToBuy = msg.value / price;
        require(
            sharesToBuy <= balanceOf(address(this)),
            "Not enough shares available"
        );
        _transfer(address(this), msg.sender, sharesToBuy);
    }

    function sellShares(uint256 _amount) public {
        require(balanceOf(msg.sender) >= _amount, "Insufficient shares");
        _transfer(msg.sender, address(this), _amount);
        uint256 etherToTransfer = _amount;
        payable(msg.sender).transfer(etherToTransfer);
    }

    receive() external payable {
        revert("StartupSwap does not accept ETH directly");
    }
}
