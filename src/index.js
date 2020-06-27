import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import Terminal from 'terminal-in-react';
import Web3 from 'web3';
import {
  Welcome,
  About
} from './Messages.js';
import {
  ConnectDesc,
  DisconnectDesc,
  AboutDesc,
  MintDesc
} from './Descriptions';
import {
  Login,
  MintTokens
} from './Actions';
import useEffects from './Effects.js';

function Term() {
  const [state, updateAppState] = useState({}); 
  useEffects(state, updateAppState);
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
        promptSymbol='$$'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          'connect': (args, print, runCommand) => {
              Login(state, updateAppState, print);
          },
          'mint': {
            method: (args, print, runCommand) => {
              if (!state.loggedIn) return print("RequiresLoginException: Please login with `connect` first.");
              if (!args.name) return print("ArgumentError: Name of token is required.");
              if (!args.amount) return print("ArgumentError: Amount of tokens to mint is required.");
              const name = args.name;
              const amount = Number.parseInt(args.amount);
              if (Number.isNaN(amount)) return print("ArgmentError: Requires an integer amount of tokens.");
              if (amount <= 0) return print("ArgmentError: Requires a positive integer amount of tokens.");
              print("Creating Tokens:");
              print(`Name: ${name}`);
              print(`Amount: ${amount}`);
              print('Cost: 100 H4KR');
              print('Please approve your spending of 100 H4KR, then approve the token create transaction.');
              MintTokens(state, updateAppState, print);
            },
            options: [
              {
                name: 'name',
                description: 'Name of the ERC token you want to create.',
              },
              {
                name: 'amount',
                description: 'Amount of tokens you want to create.',
                defaultValue: '10000000',
              },
            ],
          },
          'disconnect': (args, print, runCommand) => {
              updateAppState(state => ({
                ...state,
                loggedIn: false,
                contracts: null,
                web3: null,
                wallet: null
              }));
              print("Disconnected!")
          },
          'about': (args, print, runCommand) => {
              print(About)
          },
          
        }}
        descriptions={{
          'about': AboutDesc,
          'mint': MintDesc,
          'connect': ConnectDesc,
          'disconnect': DisconnectDesc
        }}
        msg={Welcome}
      />
    </div>);
}


function App() {
  return <Term />
}

const wrapper = document.getElementById("hackmoney-app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
