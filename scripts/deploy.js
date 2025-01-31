const hre = require("hardhat");

async function main() {
    // Fetch the contract factory
    const ReachToken = await hre.ethers.getContractFactory("ReachToken");

    // Deploy the contract
    const reachToken = await ReachToken.deploy();

    await reachToken.deployed();
    console.log(`✅ ReachToken deployed to: ${reachToken.address}`);
}

// Execute the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
