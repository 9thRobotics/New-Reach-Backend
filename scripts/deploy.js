const { ethers, upgrades } = require("hardhat");

async function main() {
  const ReachToken = await ethers.getContractFactory("ReachToken");
  console.log("Deploying ReachToken with proxy...");

  const proxy = await upgrades.deployProxy(ReachToken, { kind: "uups" });
  await proxy.deployed();

  console.log(`Proxy deployed at: ${proxy.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
