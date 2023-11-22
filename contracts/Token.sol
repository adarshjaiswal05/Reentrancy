// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This is Simple deposit and withdraw erc 20 contract with reentrancy vulnariblity & pausable function  in the deposit function
// Reentrancy: (This condition occur when the tranfer function is called before updating 
//              the internal data of the contract so if a attacker wants to Take all the funds
//              in the contract he can set up a attacker contract which will again and again hit the 
//              Withdraw function before the data is updated in the contract and like this he will Squize
//              out all the funds in our contract .)

contract Bank is ERC20, ERC20Pausable, Ownable {

    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {}
     mapping (address => uint256) public balances;
     
    event Deposite(address sender, address to, uint256 value);
    event amountWithdrawn(address sender, string message, uint256 value);

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    
     function mint (uint256 amount) public {

         _mint(msg.sender, amount);
     }

    function deposit (uint256 amount) public {
        require(amount != 0, "Amount should not be zero");

        _transfer(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
        emit Deposite(msg.sender,address(this), amount);

    }
    
    function withdraw (uint256 amount)public {
        require(amount > 0, "Amount should be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer( address(this), msg.sender, amount);
        balances[msg.sender] -= amount;
        emit amountWithdrawn(msg.sender, "amount withdrew", amount);

    }
    
    function checkTokenBalance () public view returns(uint256 balance){
         return balanceOf(msg.sender);
    } 

    // The following functions are overrides required by Solidity as there are _pausable function
    //in erc20 as well as erc20pausible

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        super._update(from, to, value);
    }

}
