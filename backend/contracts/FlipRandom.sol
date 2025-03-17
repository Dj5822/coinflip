// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*
                         A TRIVIAL RANDOM COIN FLIP CONTRACT
This contract has a single function that flips a coin and sends the prize depending on a random number.
The random number is generated using a hash of several highly unpredictable valaues to minimise front-running.
The prize is 0.01 ETH and the contract balance cannot fall below 1 ETH. 
*/

contract FlipRandom {
    // Event to log whether a flip has resulted in a prize
    event flip(address, bool); 
        constructor() {
    }

    // flipCoin() generates a best-effort front-run resistant random number.
    // Sends a prise if it is even.  
    function flipCoin() private returns (bool){
        require(address(this).balance >= 1 ether, "Fund too low");
        // Generate a random number
        uint rand = uint(keccak256(abi.encodePacked(msg.sender, blockhash(block.number),block.gaslimit, block.prevrandao, block.timestamp)));
        bool win = (rand % 2 == 0); // The user has won if the random number is even
        if (win) { 
            sendPrize();
         } 
        emit flip(msg.sender, win); // Log the flip
        return (win); 
    }

    function sendPrize() private {
        require(address(this).balance >= 1 ether, "Fund too low");
        //Send 0.01 ETH using the ugly but safe method.
        (bool sent, bytes memory data) = msg.sender.call{
           value: 10000000000000000
        }("");
        require(sent, "Failed to send Ether");
    }
}
