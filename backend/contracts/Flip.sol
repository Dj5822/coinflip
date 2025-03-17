// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Flip {

    bool private randomise;
    uint256 private flipCount;  
    address private tokenAddress;

    // flipstate mapping (0 == new address, 1 == odd flips, 2 == even flips).
    mapping(address => uint8) private flipstate;

    uint256 private addresscount; 

    // Log successful flips
    event flip(address, bool); 

        constructor(bool _rand, address _token) {
        
        randomise = _rand; // true or false depending on if randomise is required
        tokenAddress = _token; // ERC20 token to use as prize. 0 if prize is in ETH
    }

    // flipCoin() uses a flip strategy to determine whether to send a prize or not.
    // There are 2 strategies: alternating flips and randmomised flips.
    function flipCoin() public {
        require(address(this).balance >= 1 ether, "Fund too low");

        // switch on type of flip
        if (randomise == true){
            flipRandom(); // Use randomised flips
        } else {
            flipAlternate(); // Use alternating flips
        }

        flipCount++; //count every flip

    }

    // flipAlternate() changes the flip the state for each address between 1 and 2
    // Releases .01 ETH on every second flip
    function flipAlternate() private {
        // Check for second flip
        if (flipstate[msg.sender] == 2) {
            sendPrize();
        }

        // Log the flip
        emit flip(msg.sender, flipstate[msg.sender]==2);

        // Update the flip state
        if (++flipstate[msg.sender] == 3){
            flipstate[msg.sender] = 1; // Flip back to 1
        } 

        // Check new address
        if (flipstate[msg.sender] == 0) {
            addresscount++;
        }
    }

    // flipRandom() generates a best-effort front-run resistant random number.
    // Sends a prise if it is even.  
    function flipRandom() private {

        // Generate random number
        uint rand = uint(keccak256(abi.encodePacked(msg.sender, flipCount, blockhash(block.number),block.gaslimit, block.prevrandao, block.timestamp)));

        bool win = (rand % 2 == 0); // The user has won if the hash is even
      
        if (win) { sendPrize();}
    
        // Log the flip
        emit flip(msg.sender, win);
    }

    function sendPrize() private {
        require (tokenAddress ==address(0),"ERC20 Tokens not supported yet");
        //Send 0.01 ETH using the ugly but safe method.
        (bool sent, bytes memory data) = msg.sender.call{
           value: 10000000000000000
        }("");
        require(sent, "Failed to send Ether");
    }

    // Get the current flip state for a given address
    function getFlipState(address _addr) public view returns (uint256) {
        return flipstate[_addr];
    }

    function getInternalState() public view returns (bool, address, uint256, uint256 ){
        return(randomise, tokenAddress, flipCount, addresscount);
    }
}
