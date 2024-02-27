import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.1",
  // defaultNetwork: "default",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // Configuration specific to the Hardhat network
      chainId: 1337, // Default chain ID for Hardhat network
      // You can specify additional Hardhat network config here
    },
    // Define other networks here as needed
  },
  // networks: {
  //   hardhat: {
  //     chainId: 31337,
  //   },
  //   default: {
  //     url: process.env.RPC_URL,
  //     accounts:
  //       process.env.DEPLOYER_PRIVATE_KEY !== undefined
  //         ? [process.env.DEPLOYER_PRIVATE_KEY]
  //         : [],
  //   },
  // },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
