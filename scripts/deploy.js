const hre = require("hardhat");

async function main() {
  const ReachToken = await hre.ethers.getContractFactory("ReachToken");
  const reachToken = await ReachToken.deploy();

  await reachToken.deployed();

  console.log("ReachToken deployed to:", reachToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
