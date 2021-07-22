const path = require('path');
const fs = require('fs');
const solc = require('solc');

const infoPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(infoPath, 'utf8');

//Uncomment the following to show the compile message, including the byte code and API
console.log(solc.compile(source, 1));

module.exports = solc.compile(source, 1).contracts[':Lottery'];