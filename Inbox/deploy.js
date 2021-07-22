const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  // remember to change this to your own phrase!
  "guide twenty second circle primary detail mechanic little muscle sword olympic aspect",
  
  // remember to change this to your own endpoint!
  "https://rinkeby.infura.io/v3/8e91de29a47a4cbca9b9cfb424bdd361"
);
const web3 = new Web3(provider);

const getBalance = async () => { 
  const accounts = await web3.eth.getAccounts();
  console.log("balance:" + web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether'));
  return web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether'); 
}

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

getBalance();
deploy();
