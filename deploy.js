const { ethers } = require("hardhat");

async function main() {
  // Instantiate a wallet with a hardcoded private key and provider
  const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying contract with:", wallet.address);

  // Log the wallet's address
  console.log(wallet.address);

  // Get and log the wallet's balance
  let balance = await provider.getBalance(wallet.address);
  console.log("Wallet balance:", ethers.utils.formatEther(balance));

  // Check if the wallet has enough balance to deploy the contract
  if (parseFloat(ethers.utils.formatEther(balance)) < 0.01) {
    throw new Error("Insufficient funds to deploy the contract");
  }

  const ReachToken = await ethers.getContractFactory("ReachToken", wallet);
  const contract = await ReachToken.deploy(); // Add constructor params if needed

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
