// migrating the appropriate contracts
const ERC721MintableComplete = artifacts.require("./CustomERC721Token.sol");
const SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const Verifier = artifacts.require('Verifier.sol');

module.exports = async function (deployer) {
  // await deployer.deploy(ERC721MintableComplete,"Test_ERC721_Token","EG");
  try {
    await deployer.deploy(Verifier);
    await deployer.deploy(SolnSquareVerifier, Verifier.address, "Test_ERC721_Token", "EG");
  } catch (err) { console.log("my err>>>>>>>>", err) }
};
