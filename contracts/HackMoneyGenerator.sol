pragma solidity ^0.6.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "./HackMoney.sol";

contract HackMoneyGenerator is Ownable {
    using SafeMath for uint;

    ERC777 public base_token;
    uint public rate;

    constructor(address token_address) public {
      base_token = ERC777(token_address);
      rate = 100;
      rate = rate.mul(10 ** 18);
    }

    function updateRate(uint new_rate)
      public
      onlyOwner {
      rate = new_rate; 
    }

    function burn(uint burn_amount)
      public
    {
      base_token.burn(burn_amount, "");
    }

    function createMoney(string memory name, string memory symbol, uint val, uint fee)
      public
      returns (address)
    {
      require(fee == rate, "Required value not matching rate.");
      ERC777 money = new HackMoney(name, symbol, msg.sender, val);
      base_token.transferFrom(msg.sender, address(this), fee);
      return address(money);
    }
}
