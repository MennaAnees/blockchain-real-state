// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');
var { proof, inputs, wrongInputs } = require('./proof.json');

let account_one;
let account_two;
const symbol = "EG";
const name = "Test";

contract('SolnSquareVerifier', accounts => {
    account_one = accounts[0];
    account_two = accounts[1];
});

describe('match SolnSquareVerifier spec', function () {
    beforeEach(async function () {
        const verifier = await Verifier.new({ from: account_one });
        this.contract = await SolnSquareVerifier.new(verifier.address, name, symbol, { from: account_one });
    })

    it('add new solution successfully', async function () {
        const addedSuccessfully = await this.contract.addSolution.call(proof.a, proof.b, proof.c, inputs, { from: account_two });
        assert.equal(addedSuccessfully, true);
    })

    it('add new solution (fail)', async function () {
        let wrong
        try {
            await this.contract.addSolution(proof.a, proof.b, proof.c, wrongInputs, { from: account_two });
        } catch (err) {
            wrong = err.reason
        }
        assert.equal(wrong, "Solution could not be verified");
    })
});


describe('match SolnSquareVerifier spec', function () {
    beforeEach(async function () {
        const verifier = await Verifier.new({ from: account_one });
        this.contract = await SolnSquareVerifier.new(verifier.address, name, symbol, { from: account_one });
    })

    it('mint NFT', async function () {
        await this.contract.addSolution(proof.a, proof.b, proof.c, inputs, { from: account_one });
        let minted = await this.contract.mintNFT.call(inputs[0], inputs[1], account_two, { from: account_one });
        assert.equal(minted, true, "fail to mint");
    })
});

