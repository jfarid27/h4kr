pragma solidity ^0.6.10;

abstract contract IAugurShareToken {

  function safeTransferFrom(
      address from,
      address to,
      uint256 id,
      uint256 value,
      bytes calldata data
  )
      virtual
      external;

}
