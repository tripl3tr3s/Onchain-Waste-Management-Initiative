// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Payments is ReentrancyGuard {
    event PaymentSettled(address indexed from, address indexed to, uint256 amount);

    // Instant settlement in ERC-20 tokens
    function settlePayment(address token, address from, address to, uint256 amount) public nonReentrant {
        require(IERC20(token).transferFrom(from, to, amount), "Payment failed");
        emit PaymentSettled(from, to, amount);
    }
}
