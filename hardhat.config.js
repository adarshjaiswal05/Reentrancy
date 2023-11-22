/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "nDJEiMb7pluMCl40aN6zkxzxhmO_PhMM";
const MUMBAI_PRIVATE_KEY =
  "cf369e5cad95f0b0c09bbe2bedd83ab91ed0bc514636004e1121e37fe44e5a46";

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${MUMBAI_PRIVATE_KEY}`],
    },
  },
};
