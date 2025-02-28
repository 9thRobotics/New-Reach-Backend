require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan"); // Required for contract verification
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades"); // Required for upgradeable contracts

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
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [process.env.PRIVATE_KEY], // Load from .env file for security
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL || "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Load from .env for security
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
};
