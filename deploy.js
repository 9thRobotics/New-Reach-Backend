async function main() {
  let [deployer] = await ethers.getSigners(); // Add this line to define the deployer
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
