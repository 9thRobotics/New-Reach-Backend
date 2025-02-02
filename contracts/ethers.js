const { ethers } = require("ethers");

const abi = [
  // Add the ABI of your contract constructor here
];
const iface = new ethers.utils.Interface(abi);

const encodedArgs = iface.encodeDeploy([
  // Add your constructor arguments here
]);

console.log(encodedArgs);
