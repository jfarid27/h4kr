pragma solidity ^0.6.10;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./IAugurShareToken.sol";
import "./HackMoneyAugurTokenERC777.sol";

contract HackMoneyAugurTokenERC777 is ERC777, Ownable {
    using SafeMath for uint;
 
    IAugurShareToken public augurShareTokens;
    uint public marketTokenId;
    bool safeShutdown = false;

    constructor(string memory name, string memory symb, address _augurShareTokens, uint _marketTokenId)
      ERC777(name, symb, new address[](0))
      public
    {
      augurShareTokens = IAugurShareToken(_augurShareTokens);
      marketTokenId    = _marketTokenId;
    }

    function createTokensFromShares(uint amount)
      public
    {
      require( !safeShutdown );
      augurShareTokens.safeTransferFrom(msg.sender, address(this), marketTokenId, amount, "");
      _mint(msg.sender, amount, "", "");
    }

    function burnTokensSendShares(uint amount)
      public
    {
      augurShareTokens.safeTransferFrom(address(this), msg.sender, marketTokenId, amount, "");
      burn(amount, "");
    }

    function shutdown()
      public
      onlyOwner
    {
      safeShutdown = true;
    }
    
}
