import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("NeonToken", function () {
  const _name = "Neon";
  const _symbol = "NEON";

  const oneEth = ethers.utils.parseUnits("1", 18);

  async function deployNeonTokenFixture() {
    const NeonToken = await ethers.getContractFactory("NeonToken");
    const accounts = await ethers.getSigners();
    const neon = await NeonToken.deploy();
    return { neon, accounts };
  }

  it("should initialize with the correct name and symbol", async () => {
    const { neon } = await loadFixture(deployNeonTokenFixture);
    expect(await neon.name()).to.equal(_name);
    expect(await neon.symbol()).to.equal(_symbol);
  });

  it("should mint tokens to a user", async () => {
    const { neon, accounts } = await loadFixture(deployNeonTokenFixture);
    await neon.mint();
    const balance = await neon.balanceOf(accounts[0].address);
    expect(balance).to.equal(oneEth);
  });

  it("should prevent minting more than 1 token per user", async () => {
    const { neon, accounts } = await loadFixture(deployNeonTokenFixture);
    await neon.mint();
    await expect(neon.mint()).to.be.revertedWith(
      "Only 1 NEON token per wallet"
    );
    const balance = await neon.balanceOf(accounts[0].address);
    expect(balance).to.equal(oneEth);
  });
});
