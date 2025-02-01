async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const ReachToken = await ethers.getContractFactory("ReachToken");
  const contract = await ReachToken.deploy(); // Add constructor params if needed

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
