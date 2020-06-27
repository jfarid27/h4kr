import React, { useEffect } from 'react';

import { ERC777, Generator } from './ABIs.js';
import { token_address, generator_address } from './Constants.js';
import Contract from 'web3-eth-contract';

export const buildContracts = (state) => {
  if (!state.web3) return state;
  if (state.contracts && state.contracts.token && state.contracts.generator) return state;
  const token = new state.web3.eth.Contract(
    ERC777,
    (env.MODE == 'development' ? token_address.ropsten : token_address.mainnet),
    {}
  );

  const generator = new state.web3.eth.Contract(
    Generator,
    (env.MODE == 'development' ? generator_address.ropsten : generator_address.mainnet),
    {}
  );

  state.contracts = { token, generator };
  return state;
};

const UseEffects = (props) => {
  const {state, updateAppState} = props;
  useEffect(buildContracts(state, updateAppState), [state.web3]);
  return <div />
};

export default UseEffects;
