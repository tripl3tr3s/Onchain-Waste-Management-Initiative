// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract RoleManager is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MANUFACTURER_ROLE = keccak256("MANUFACTURER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    // Admin assigns roles to users
    function assignManufacturer(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(MANUFACTURER_ROLE, account);
    }

    function assignDistributor(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(DISTRIBUTOR_ROLE, account);
    }

    function assignRetailer(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(RETAILER_ROLE, account);
    }
}
