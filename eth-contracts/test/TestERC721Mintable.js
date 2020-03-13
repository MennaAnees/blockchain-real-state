var ERC721MintableComplete = artifacts.require('CustomERC721Token');

let account_one;
let account_two;
let myContract;
contract('TestERC721Mintable', accounts => {

     account_one = accounts[0];
     account_two = accounts[1];

})

describe('match erc721 spec', function () {
    beforeEach(async function () {
    
        this.contract = await ERC721MintableComplete.new({ from: account_one });
        // console.log("this.contract", myContract)
        // TODO: mint multiple tokens
        let tokenId1 = 1;
        let tokenId2 = 2
        await this.contract.mint(account_one, tokenId1, { from: account_one })
        await this.contract.mint(account_two, tokenId2, { from: account_one })
    })

    it('should return total supply', async function () {
        const totalSupply = await this.contract.totalSupply({from: account_one})
        assert.equal(totalSupply, 2)
    })

    it('should get token balance', async function () {
        const balanceAccount_one = await this.contract.balanceOf(account_one);
        const balanceAccount_two = await this.contract.balanceOf(account_two);
        assert.equal(balanceAccount_one, 1);
        assert.equal(balanceAccount_two, 1);
    })

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it('should return token uri', async function () {
        const tokenUri_one = await this.contract.tokenURI(1);
        const tokenUri_two = await this.contract.tokenURI(2);
        assert.equal(tokenUri_one, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        assert.equal(tokenUri_two, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2");
    })

    it('should transfer token from one owner to another', async function () {
        const tokenId = 1;
        const from = await this.contract.ownerOf(tokenId);
        const to = account_two;
        await this.contract.transferFrom(from, to, tokenId)
        const newOwner = await this.contract.ownerOf(tokenId);
        assert.equal(newOwner, to);
    })
});

describe('have ownership properties', function () {
    beforeEach(async function () {
        this.contract = await ERC721MintableComplete.new({ from: account_one });
    })

    it('should fail when minting when address is not contract owner', async function () {
        let tokenId = 1;
        let error;
        try {
            await this.contract.mint(account_two, tokenId, { from: account_two })
        } catch (err) {
            error = "failed"
        }
        assert.equal(error, "failed")
    })

    it('should return contract owner', async function () {
        const owner = await this.contract.contractOwner();
        assert.equal(owner.receipt.from, account_one.toLowerCase())
    })

});