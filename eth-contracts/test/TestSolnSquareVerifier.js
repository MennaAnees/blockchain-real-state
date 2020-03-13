// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let account_one;
let account_two;

contract('SolnSquareVerifier', accounts => {
     account_one = accounts[0];
     account_two = accounts[1];

});

describe('match SolnSquareVerifier spec', function () {
    beforeEach(async function () {
    
        this.contract = await SolnSquareVerifier.new({ from: account_one });
        // console.log("this.contract", myContract)
        // TODO: mint multiple tokens
        // let tokenId1 = 1;
        // let tokenId2 = 2
        // await this.contract.mint(account_one, tokenId1, { from: account_one })
        // await this.contract.mint(account_two, tokenId2, { from: account_one })
    })

    it('add new solution', async function () {
        const arrLength = await this.contract.addSolution(1, account_one);
        // const sol = await this.contract.solutions();
        // console.log("arrLength",sol)
        // assert.equal(totalSupply, 2)
    })
});

