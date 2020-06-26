pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract HackMoney is ERC777 {
    constructor(string memory name, string memory symb, address owner, uint total)
        ERC777(name, symb, new address[](0))
        public
    {
        _mint(owner, total, "", "");
    }
}
