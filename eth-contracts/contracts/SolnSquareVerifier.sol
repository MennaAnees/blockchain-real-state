pragma solidity ^0.5.0;

import "./ERC721Mintable.sol";

//2- TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token {
    Verifier private verifierContract;
    constructor(
        address verifierAddress,
        string memory name, 
        string memory symbol
    ) public CustomERC721Token(name, symbol){
        verifierContract = Verifier(verifierAddress);
    }
    //3- TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 solutionIndex;
        address solutionAddress;
        bool isMinted;
    }

    //4- TODO define an array of the above struct
    // Solution[] public solutions;
    uint256 numberOfSolutions = 0;

    //5- TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) public solutions;

    //6- TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 solutionIndex, address indexed solutionAddress);

    //7- TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns(address r){
        bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));
        require(
            solutions[solutionHash].solutionAddress == address(0),
            "Solution exists already"
        );

        bool verified = verifierContract.verifyTx(a, b, c, input);
        require(verified, "Solution could not be verified");

        solutions[solutionHash] = Solution(
            numberOfSolutions,
            msg.sender,
            false
        );

        emit SolutionAdded(numberOfSolutions, msg.sender);
        numberOfSolutions += 1;
        return solutions[solutionHash].solutionAddress;
    }

    //8- TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(uint256 a, uint256 b, address to) public returns(address r){
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b));
        // require(
        //     solutions[solutionHash].solutionAddress != address(0),
        //     "Solution does not exist"
        // );
        // require(
        //     solutions[solutionHash].isMinted == false,
        //     "Token already minted for this solution"
        // );
        // require(
        //     solutions[solutionHash].solutionAddress == msg.sender,
        //     "Only solution address can use it to mint a token"
        // );
        // super.mint(to, solutions[solutionHash].solutionIndex);
        // solutions[solutionHash].isMinted = true;
        return solutions[solutionHash].solutionAddress;
    }

}

//1- TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract Verifier {
    function verifyTx(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input
    ) public returns (bool r);
}