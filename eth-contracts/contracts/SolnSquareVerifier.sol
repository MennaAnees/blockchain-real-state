
pragma solidity ^0.5.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";
// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// TODO define a solutions struct that can hold an index & an address

// TODO define an array of the above struct

// TODO define a mapping to store unique solutions submitted

// TODO Create an event to emit when a solution is added

// TODO Create a function to add the solutions to the array and emit the event

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
contract SolnSquareVerifier is CustomERC721Token {
    struct Solution{
        uint256 index;
        address addr;
    }

    Solution[] public solutions;
    mapping(bool=> Solution) submittedSolutions;
    event addSolutionEvent(address caller, uint256 index);

    function addSolution(uint256 index, address addr) public returns(uint arraylength){
        Solution memory newSolution;
        newSolution.index = index;
        newSolution.addr = addr;
        solutions.push(newSolution);
        emit addSolutionEvent(addr, index);
        return solutions.length;
    }

    // function mintToken(address to, uint256 tokenId, Solution memory solution) public{
    //     require(submittedSolutions[solution] != true, "solution is submitted before");
    //     mint(to, tokenId);
    //     submittedSolutions[true] = solution;
    // }
}