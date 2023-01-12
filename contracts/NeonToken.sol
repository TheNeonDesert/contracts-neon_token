//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/AccessControl.sol";

contract NeonToken is ERC20 {
    // , AccessControl
    // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    // make minter role a DAO multisig

    // temporary just to allow wallets to mint 1 NEON token each
    mapping(address => uint256) public minted; // quantity NEON minted by each wallet

    // TODO track the total supply of NEON tokens minted and wallets with balances... ? to see top wallets and stuff?

    constructor() ERC20("Neon", "NEON") {
        // _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // TODO move both these to 5-of-9 DAO
        // _grantRole(MINTER_ROLE, msg.sender);
    }

    // mints one at a time, to sender
    // TODO move this method to the Altar contract? and put the access controls here
    function mint() public {
        // onlyRole(MINTER_ROLE)
        require(minted[msg.sender] < 1 ether, "Only 1 NEON token per wallet");
        minted[msg.sender] += 1 ether;
        // TODO allow a 2nd NEON token if the wallet has an Avatar with at least 200sp
        _mint(msg.sender, 1 ether);
    }
}