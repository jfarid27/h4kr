import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'terminal-in-react';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import WelcomeMessage from './WelcomeMessage.js';
import {
  ConnectDescription
} from './Descriptions';

const login = async (state, updateAppState, print) => {
  const onboard = Onboard({
    dappId: "62745b3f-d523-4532-a52b-1b0d98d20939",
    networkId: 1,
    subscriptions: {
      wallet: wallet => {
         const web3 = new Web3(wallet.provider);
         updateAppState(st => ({ ...st, web3 }))
      }
    }
  });
  if (state.web3) {
    print("AlreadyLoggedInException: You have already logged in. Clear with `disconnect`");
    return;
  }
  try {
    print("Please select a login method.");
    return
    // const login = onboard(updateAppState);
    // await login.walletSelect();
    // await login.walletCheck();
    print("LoginException: An error occurred during login.");
  } catch {
    print("LoginException: An error occurred during login.");
  }

}


function App() {
  const [state, updateAppState] = useState({}); 
  return (<div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <Terminal
        color='white'
        backgroundColor='#17061d'
        barColor='#17061d'
        startState='maximised'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          'connect': {
            method: (args, print, runCommand) => {
              login(state, updateAppState, print);
            },
            options: [
              {
                name: 'option',
                description: 'The Wallet Option you would like. Choose `metamask` or `walletconnect`',
                defaultValue: 'white',
              },
            ],
          },
        }}
        descriptions={{
          'connect': ConnectDescription, 
        }}
        msg={WelcomeMessage}
      />
    </div>);
}

const wrapper = document.getElementById("hackmoney-app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
