//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract NeonToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Neon", "NEON") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // TODO move to 5-of-9 DAO
        _grantRole(MINTER_ROLE, msg.sender); // TODO move to 5-of-9 DAO
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
