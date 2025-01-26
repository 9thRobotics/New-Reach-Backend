require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers"); // ✅ Ensure this is from @nomicfoundation
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

module.exports = {
  solidity: "0.8.26", // ✅ Ensure this matches your contract's Solidity version
  defaultNetwork: "hardhat", // ✅ Safe default to avoid accidental deployments
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL || process.env.INFURA_GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 5 // ✅ Explicitly specify chain ID for Goerli
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111 // ✅ Explicitly specify chain ID for Sepolia
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337 // ✅ Explicitly specify chain ID for Hardhat Network
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  },
  mocha: {
    timeout: 20000 // ✅ Prevents tests from failing due to long execution times
  }
};
