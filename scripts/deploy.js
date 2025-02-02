const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const Token = await ethers.getContractFactory("ReachToken");
  const token = await Token.deploy("Reach Token", "9D-RC", 18, "1000000000000000000000");

  console.log("Contract deployed at:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
