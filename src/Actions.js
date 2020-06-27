import { onboard_settings } from './Constants';
import Onboard from 'bnc-onboard';

const MintTokens = async (state, updateAppState, print) => {

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
          return st;
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
    })
    print("Login complete!");
  } catch (err) {
    print("LoginException: An error occurred during login.");
  }
}

export {
  Login,
  MintTokens
};
