// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // The version of the compiler we are using, make sure it matches solidity version in hardhat.config

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // unsigned integer

    constructor() {
        console.log("Hello, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        // wallet address of the person who called the function
        // this works a wallet needs to connect in order to invoke smart contract fns
        console.log("%s has waved", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function rockPaperScissors(
        string memory userChoice,
        string memory randomChoice
    ) public pure returns (string[3] memory) {
        if (keccak256(bytes(userChoice)) == keccak256(bytes(randomChoice))) {
            return ["Draw", userChoice, randomChoice];
        }
        
        if (
            keccak256(bytes(userChoice)) == keccak256(bytes("rock")) &&
            keccak256(bytes(randomChoice)) == keccak256(bytes("paper")) ||
            keccak256(bytes(userChoice)) == keccak256(bytes("paper")) &&
            keccak256(bytes(randomChoice)) == keccak256(bytes("scissors")) ||
            keccak256(bytes(userChoice)) == keccak256(bytes("scissors")) &&
            keccak256(bytes(randomChoice)) == keccak256(bytes("rock"))
        ) {
            return ["lose", userChoice, randomChoice];
        } else {
            return ["win", userChoice, randomChoice];
        }
    }
}
