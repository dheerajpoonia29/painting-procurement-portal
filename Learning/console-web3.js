// var Web3 = require('web3');

console.log("#Main Classes of Web3.js -----------");
console.log(">Web3: ", Web3);
console.log(">Web3.utils: ", Web3.utils);
console.log(">Web3.givenProvider: ", Web3.givenProvider);
console.log(">Web3.providers: ", Web3.providers);
console.log(">Web3.modules: ", Web3.modules);

console.log(
  "#Making new instance of web3 with metmask selected provider -----------"
);
let web3 = new Web3(Web3.givenProvider);
console.log(">web3(new Web3): ", web3);

console.log('#Exploring Web3 new instance web3')
console.log(
  ">web3.currentProvider.isConnected(): ",
  web3.currentProvider.isConnected()
);
console.log(">web3.eth.accounts(): ", web3.eth.accounts);
