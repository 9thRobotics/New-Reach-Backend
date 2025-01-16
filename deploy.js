const hre = require("hardhat");

async function main() {
    const ReachToken = await hre.ethers.getContractFactory("ReachToken");
    const reachToken = await ReachToken.deploy();

    await reachToken.deployed();
    console.log("ReachToken deployed to:", reachToken.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
