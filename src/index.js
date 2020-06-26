import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'terminal-in-react';
import Onboard from 'bnc-onboard';
import Web3 from 'web3';
import WelcomeMessage from './WelcomeMessage.js';
import {
  ConnectDesc,
  DisconnectDesc
} from './Descriptions';

const login = async (state, updateAppState, print) => {
  const onboard = Onboard({
    dappId: "62745b3f-d523-4532-a52b-1b0d98d20939",
    networkId: 1,
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

function Term() {
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
          'connect': (args, print, runCommand) => {
              login(state, updateAppState, print)
          },
          'disconnect': (args, print, runCommand) => {
              updateAppState(state => ({ ...state, loggedIn: false, web3: null, wallet: null }));
              print("Disconnected!")
          },
        }}
        descriptions={{
          'connect': ConnectDesc, 
          'disconnect': DisconnectDesc, 
        }}
        msg={WelcomeMessage}
      />
    </div>);
}


function App() {
  return <Term />
}

const wrapper = document.getElementById("hackmoney-app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
