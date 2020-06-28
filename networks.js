const { projectId, mnemonic } = require('./.secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      networkId: '*',
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        mnemonic, `https://ropsten.infura.io/v3/${projectId}`
      ),
      networkId: 3,
      gasPrice: 10e9
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        mnemonic, `https://mainnet.infura.io/v3/${projectId}`
      ),
      networkId: 1,
      gasPrice: web3.utils.toWei('30', 'gwei')
    }
  },
};
