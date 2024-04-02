// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import {StartupSwap} from "./StartupSwap.sol";

contract StartupFactory is Pausable, AccessControlEnumerable {
    bytes32 public constant STARTUP_OWNER_ROLE = keccak256("STARTUP_OWNER");

    address public startupSwapImplementation;

    address[] public startupContractAddresses;
    mapping(uint256 => address) public startupIdToERC20;
    mapping(address => address) public ownerToStartup;
    uint256 public contractCount;

    address public contractOwner;

    event StartupCreated(address indexed owner, address indexed startup);

    constructor(address _startupSwapImplementation) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        startupSwapImplementation = _startupSwapImplementation;
    }

    function createStartup(
        uint256 _startupId,
        string memory _name,
        string memory _symbol,
        uint256 _totalShareCount,
        uint256 _pricePerShare
    )
        public
        onlyRole(STARTUP_OWNER_ROLE)
        whenNotPaused
        returns (address payable)
    {
        address payable clone = payable(
            Clones.cloneDeterministic(
                startupSwapImplementation,
                keccak256(abi.encodePacked(_startupId))
            )
        );

        StartupSwap(clone).initialize(
            _name,
            _symbol,
            msg.sender,
            _totalShareCount,
            _pricePerShare
        );

        startupContractAddresses.push(clone);
        startupIdToERC20[_startupId] = clone;
        ownerToStartup[msg.sender] = clone;
        contractCount += 1;

        emit StartupCreated(msg.sender, clone);

        return clone;
    }

    function getStartupAddresses()
        public
        view
        whenNotPaused
        returns (address[] memory)
    {
        return startupContractAddresses;
    }

    function getStartupByOwner() public view whenNotPaused returns (address) {
        return ownerToStartup[msg.sender];
    }

    function addStartupOwner(
        address _startupOwner
    ) public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        _grantRole(STARTUP_OWNER_ROLE, _startupOwner);
    }

    function removeStartupOwner(
        address _startupOwner
    ) public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        _revokeRole(STARTUP_OWNER_ROLE, _startupOwner);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function withdraw() external payable onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function _setContractOwner(
        address _contractOwner
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        contractOwner = _contractOwner;
    }

    function _getContractOwner() public view returns (address) {
        return contractOwner;
    }

    receive() external payable {
        revert("StartupFactory: Cannot accept Ether");
    }
}
