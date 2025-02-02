require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // Ensure Etherscan plugin is enabled
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades"); // Important for upgradeable contracts

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID',
      accounts: ['YOUR_PRIVATE_KEY'],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};
