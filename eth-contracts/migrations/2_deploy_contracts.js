// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require('Verifier.sol');

// var ERC721MintableComplete = artifacts.require("./CustomERC721Token.sol");
module.exports = async function(deployer) {
  // deployer.deploy(SquareVerifier);
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier,Verifier.address,"test","EG");

  // deployer.deploy(ERC721MintableComplete,"test","EG");
};
