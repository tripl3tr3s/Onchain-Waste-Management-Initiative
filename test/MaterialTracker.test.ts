import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MaterialTracker } from "../typechain-types";

describe("MaterialTracker", function () {
  let materialTracker: MaterialTracker;
  let owner: SignerWithAddress;
  let supplier: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, supplier, addr1] = await ethers.getSigners();

    const MaterialTracker = await ethers.getContractFactory("MaterialTracker");
    materialTracker = await MaterialTracker.deploy("ipfs://test/");
    await materialTracker.deployed();

    // Grant supplier role
    const supplierRole = await materialTracker.SUPPLIER_ROLE();
    await materialTracker.grantRole(supplierRole, supplier.address);
  });

  describe("Material Creation", function () {
    it("Should create new material", async function () {
      const tx = await materialTracker.connect(supplier).createMaterial(
        "Steel",
        "BATCH001",
        "ipfs://metadata/batch001",
        100
      );

      const receipt = await tx.wait();
      const event = receipt.events?.find(e => e.event === "MaterialCreated");
      
      expect(event).to.not.be.undefined;
      expect(event?.args?.name).to.equal("Steel");
      expect(event?.args?.batchId).to.equal("BATCH001");
    });
  });

  // Add more test cases...
});