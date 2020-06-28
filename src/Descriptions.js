const ConnectDesc = 'connects to a web3 provider';
const DisconnectDesc = 'disconnects from the web3 provider';
const AboutDesc = 'show details about the project';
const MintDesc = `

  NAME
    mint
  SYNOPSIS
    mint <Token Name> <Symbol> <Amount>
  DESCRIPTION
    Mints social tokens with the given data. After accepting the transaction,
    you will have tokens sent to your account.
  OPTIONS
    <Token Name> String - Name of the token.
    <Symbol>     String - A ticker symbol for the token.
    <Amount>     Number -The amount of tokens to mint. By default, each token has 18 decimals.
`;

export {
  ConnectDesc,
  DisconnectDesc,
  AboutDesc,
  MintDesc 
};
