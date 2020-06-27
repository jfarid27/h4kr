const token_address = '0x761185bed0c7413799aefe021e975b2e61a9c450';
const generator_address = '';

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

export {
  token_address,
  generator_address,
  onboard_settings,
};
