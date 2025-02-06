const { ethers, upgrades } = require("hardhat");

async function main() {
    const ReachToken = await ethers.getContractFactory("ReachToken");

    // Deploy using a proxy
    const reachToken = await upgrades.deployProxy(ReachToken, [], { initializer: "initialize" });

    console.log("ReachToken deployed to:", await reachToken.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
