pragma solidity ^0.6.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "./HackMoney.sol";

contract HackMoneyGenerator is Ownable {
    using SafeMath for uint;

    ERC777 private base_token;
    uint private burned = 0;
    uint private rate;

    constructor(address token_address) public {
      base_token = ERC777(token_address);
      rate = 100;
      rate = rate.mul(1 ether);
    }

    function updateRate(uint new_rate)
      public
      onlyOwner {
      rate = new_rate; 
    }
  
    function getRate()
      public view
      returns (uint)
    {
      return rate; 
    }

    function getBaseToken()
      public view
      returns (address)
    {
      return address(base_token); 
    }

    function createMoney(string memory name, string memory symbol, uint val, uint burn)
      public
      returns (address)
    {
      uint allowance = base_token.allowance(msg.sender, address(this));
      require(burn == rate, "Required value not matching rate.");
      require(allowance <= burn, "Required allowance not available.");
      ERC777 money = new HackMoney(name, symbol, msg.sender, val);
      burned += burn;
      base_token.transferFrom(msg.sender, address(this), burn);
      return address(money);
    }
}
