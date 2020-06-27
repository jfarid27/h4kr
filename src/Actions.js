import Onboard from 'bnc-onboard';
import BN from 'bn.js';
import {
  token_address,
  generator_address,
  onboard_settings,
  current_rate,
  decimals
} from './Constants';
import { buildContracts } from './Effects';
import Web3 from 'web3';

const DECIMALS = (new BN("10")).pow(new BN(decimals));

const MintTokens = async (name, symb, amount, state, updateAppState, print) => {
  if (!state.web3 || !state.loggedIn) return;
  const { generator, token } = state.contracts;
  const tribute = (new BN(current_rate)).mul(DECIMALS).toString();
  const minting = (new BN(amount)).mul(DECIMALS).toString();
  try {
    const gas_response = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
      .then(res => res.json());
    const gasPrice = gas_response["fast"] / 10 || 10;
    const fastestGas = state.web3.utils.toWei(`${gasPrice}`, "gwei");
    const approve_result = await token.methods.approve(generator.options.address, tribute).send({
      gas: 60000,
      from: state.wallet.provider.selectedAddress,
      gasPrice: `${fastestGas}`
    });
    const mint_response = await generator.methods.createMoney(
      name,
      symb,
      minting,
      tribute
    ).send({
      gas: 3466457,
      from: state.wallet.provider.selectedAddress,
      gasPrice: `${fastestGas}`
    });
  } catch (err) {
    print("Exception: An error has occurred. Please see below");
    console.log(err)
  }
};

const Login = async (state, updateAppState, print) => {
  const onboard = Onboard({
    ...onboard_settings,
    subscriptions: {
      wallet: wallet => {
        const web3 = new Web3(wallet.provider);
        updateAppState(st => {
          st.web3 = web3;
          st.wallet = wallet;
          let st2 = buildContracts(st);
          return st2;
        });
      }
    }
  });

  if (state.loggedIn) {
    print("AlreadyLoggedInException: You have already logged in. Clear with `disconnect`");
    return;
  }
  try {
    print("Please select a login method.");
    await onboard.walletSelect();
    await onboard.walletCheck();
    await Promise.resolve();
    updateAppState(state => {
      state.loggedIn = true;
      return state;
    });
    print("Login complete!");
  } catch (err) {
    print("LoginException: An error occurred during login.");
  }
}

export {
  Login,
  MintTokens
};
