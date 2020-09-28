const token_address = {
  mainnet: '0x761185bed0c7413799aefe021e975b2e61a9c450',
  ropsten: '0x41523eDE082B7903f6BB04A9E57C17f8e0BAa32F'
};
const generator_address = {
  mainnet: '0x2AD1e986675c621F44A48d8e6DFF017292E784A5',
  ropsten: '0x45Dd3f3927B6B229c86156dc433D0F12734FAAdC'
};

const onboard_settings = {
  dappId: "62745b3f-d523-4532-a52b-1b0d98d20939",
  networkId: 1,
  walletSelect: {
    wallets: [
      { walletName: "metamask", preferred: true },
      { walletName: 'walletConnect', infuraKey: '59b45ea43eac43f4818fba49e62e82f8' }
    ]
  }
};

const current_rate = 100;
const decimals = '18';

export {
  token_address,
  generator_address,
  onboard_settings,
  current_rate,
  decimals
};
