import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("NeonToken", function () {
  it("Should create the token and send deployer 1111 NEON", async function () {
    const intialSupply = 1111;
    const NeonToken = await ethers.getContractFactory("NeonToken");
    const neon = await NeonToken.deploy(intialSupply);
    await neon.deployed();

    // const owner = getOwnerAddress();
    // const bnInitialSupply = conterToBigNumber(intialSupply) as BigNumber;
    // expect(await neon.balanceOf(owner)).to.equal(bnInitialSupply);
  });
});
