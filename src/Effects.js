import { useEffect } from 'react';

import { ERC777, Generator } from './ABIs.js';
import { token_address, generator_address } from './Constants.js';

const buildContracts = (state, updateAppState) => () => {
  if (!state.web3) return;
  if (state.contracts && state.contracts.token && state.contracts.generator) return;

  const token = new state.web3.eth.Contract(
    ERC777,
    token_address,
    {}
  );

  const generator = new state.web3.eth.Contract(
    Generator,
    generator_address,
    {}
  );

  const contracts = { token, generator };
  updateAppState((st) => ({ ...st, contracts }));
};

const useEffects = (state, updateAppState) => {
  useEffect(buildContracts(state, updateAppState), state.web3);
};

export default useEffects;
