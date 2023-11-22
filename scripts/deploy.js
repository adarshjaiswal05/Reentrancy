async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const BANK = await ethers.getContractFactory("Bank");
  const bank = await BANK.deploy();
  console.log("Bank deployed to address:", bank.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
