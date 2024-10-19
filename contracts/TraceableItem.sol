// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TraceableItem is ERC1155, AccessControl, ReentrancyGuard {
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    mapping(uint256 => string) public itemNames; // Maps token IDs to product names

    event ItemCreated(uint256 indexed itemId, string name, address creator);
    event ItemTransferred(uint256 indexed itemId, address from, address to, uint256 amount);

    constructor() ERC1155("https://example.com/api/token/{id}.json") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Create a new product (called only by manufacturers)
    function createItem(uint256 itemId, uint256 amount, string memory name) public onlyRole(MANUFACTURER_ROLE) {
        _mint(msg.sender, itemId, amount, "");
        itemNames[itemId] = name;
        emit ItemCreated(itemId, name, msg.sender);
    }

    // Transfer item from sender to receiver (access controlled)
    function transferItem(
        address from,
        address to,
        uint256 itemId,
        uint256 amount
    ) public nonReentrant {
        safeTransferFrom(from, to, itemId, amount, "");
        emit ItemTransferred(itemId, from, to, amount);
    }

    // Role-based minting function for additional manufacturing
    function mintMore(uint256 itemId, uint256 amount) public onlyRole(MANUFACTURER_ROLE) {
        _mint(msg.sender, itemId, amount, "");
    }

    // Role Management (Admin can assign roles)
    function addManufacturer(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MANUFACTURER_ROLE, account);
    }

    function addDistributor(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(DISTRIBUTOR_ROLE, account);
    }

    function addRetailer(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(RETAILER_ROLE, account);
    }
}
