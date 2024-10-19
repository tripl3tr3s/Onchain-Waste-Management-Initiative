// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@ensdomains/ens-contracts/contracts/registry/ENS.sol"; // Similar to ENS

contract BNSRegistry {
    ENS public ens;

    constructor(address ensAddress) {
        ens = ENS(ensAddress);
    }

    // Register a product name
    function registerProductName(bytes32 node, address owner) public {
        // Assumes product name is hashed and managed in ENS style
        ens.setOwner(node, owner);
    }

    function getProductOwner(bytes32 node) public view returns (address) {
        return ens.owner(node);
    }
}
