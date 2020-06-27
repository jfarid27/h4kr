import React, { useState, useEffect, Component } from 'react';
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

function Term() {
  const [state, updateAppState] = useState({}); 
  const web3 = state.web3;
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
        watchConsoleLogging
        promptSymbol='$$'
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          'connect': (args, print, runCommand) => {
              Login(state, updateAppState, print);
          },
          'mint': {
            method: (args, print, runCommand) => {
              if (!state.loggedIn) return print("RequiresLoginException: Please login with `connect` first.");
              if (!args._.length === 3) return print("ArgumentError: Requires 3 arguments. Type `mint --help` to see more.");
              const name = args._[0];
              const symbol = args._[1];
              const amount = Number.parseInt(args._[2]);
              if (Number.isNaN(amount)) return print("ArgmentError: Requires an integer amount of tokens. Type `mint --help` to see more.");
              if (amount <= 0) return print("ArgmentError: Requires a positive integer amount of tokens. Type `mint --help` to see more.");
              print("Creating Tokens:");
              print(`Name: ${name}`);
              print(`Amount: ${amount}`);
              print('Cost: 100 H4KR');
              print('Please approve your spending of 100 H4KR, then approve the token create transaction.');
              MintTokens(name, symbol, amount, state, updateAppState, print);
            },
            options: [
              {
                name: 'token',
                description: 'Name of the ERC token you want to create (required).',
              },
              {
                name: 'symbol',
                description: 'Symbol of the ERC token you want to create (required).',
              },
              {
                name: 'amount',
                description: 'Amount of tokens you want to create. Must be an integer greater than zero (required).',
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
          'contact': () => {
            window.location.href = "mailto:monteluna@protonmail.com?subject=Contact from HackMoney.crypto&body=Hello%20World!"
          },
          
        }}
        descriptions={{
          'about': AboutDesc,
          'mint': MintDesc,
          'connect': ConnectDesc,
          'disconnect': DisconnectDesc,
          'contact': 'contact the creator of this app'
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
