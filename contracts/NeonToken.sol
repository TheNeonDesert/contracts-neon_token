//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NeonToken is ERC20, Ownable, ReentrancyGuard {

    uint256 public constant MAX_SUPPLY = 1000 ether; // 10,000 NEON

    constructor() ERC20("Neon", "NEON") { }

    // Function to receive MATIC and mint NEON
    function buyNeon() public payable nonReentrant {
        uint256 amountToMint = msg.value; // 1 MATIC = 1 NEON token
        require(totalSupply() + amountToMint <= MAX_SUPPLY, "Exceeds max supply of NEON");
        _mint(msg.sender, amountToMint);
    }

    // Withdraw function for the contract owner to withdraw MATIC received
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Function to allow contract to accept MATIC directly sent to its address
    receive() external payable {
        buyNeon();
    }

    fallback() external payable {}
}