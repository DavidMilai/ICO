// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
  import "@openzeppelin/contracts/access/Ownable.sol";
  import "./ICryptoDevs.sol";

  contract CryptoDevToken is ERC20, Ownable {

    ICryptoDevs cryptoDevsNFT;


    constructor(address _cryptoDevsContract) ERC20("Crypto Dev Token", "CD"){
        cryptoDevsNFT = ICryptoDevs(_cryptoDevsContract);
    }

  }