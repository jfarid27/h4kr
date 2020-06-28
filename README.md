# HackingMoney.Crypto
---

This is the source code for [HackingMoney.Crypto](https://hackmoney-crypto.herokuapp.com/). Feel free to share and contribute.

This project is the GPL-v3-or-later license.

# Requirements

This project runs on NodeJS and requires the openzeppelin CLI if you would like to contribute.
Install the CLI with `npm install @openzeppelin/cli`.

# Testing

For general contract level tests, run:
`npm run test`

# Deployment

Install dependencies and run `npm run`.

# Development

1. Start the dev server with `npm run start:dev-server`. Keep this running.
2. In another window, start the dev webpack watchers with `npm run start:dev`.

Note you will have to recompile contracts and input new ABIs in `src/ABIs.js` if you wish to capture
any Solidity changes.
