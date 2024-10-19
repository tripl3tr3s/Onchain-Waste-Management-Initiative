import { ethers } from "hardhat";
import { verify } from "../scripts/verify";

async function main() {
  const baseURI = "ipfs://your-ipfs-base-uri/";
  
  // Deploy MaterialTracker
  const MaterialTracker = await ethers.getContractFactory("MaterialTracker");
  const materialTracker = await MaterialTracker.deploy(baseURI);
  await materialTracker.deployed();

  console.log(`MaterialTracker deployed to: ${materialTracker.address}`);

  // Verify contract
  await verify(materialTracker.address, [baseURI]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });