async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  // Log the deployer's address
  console.log(deployer.address);

  // Get and log the deployer's balance
  let balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.utils.formatEther(balance));

  const ReachToken = await ethers.getContractFactory("ReachToken");
  const contract = await ReachToken.deploy(); // Add constructor params if needed

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
