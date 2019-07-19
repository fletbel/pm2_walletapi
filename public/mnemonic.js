// const bip39 = require('bip39');

// function Mnemonic() {}
// Mnemonic.prototype.words = bip39.generateMnemonic();
// Mnemonic.prototype.wordsArr = bip39.generateMnemonic().split(' ');

// module.exports = Mnemonic;

const bip39 = require('bip39');
const db = require("../libs/database");

function mnemonicGenerator() {
    const words = bip39.generateMnemonic();
    const wordsArr = words.split(' ');
    return {
        words: words,
        wordsArr: wordsArr
    }
}


module.exports = mnemonicGenerator;
// generateMnemonic: () => {
// generateMnemonic.prototype.addToDB = function() {
// console.log();
// db.connect("walletapi", (err) => {
//         console.log(err);
//     })
// }

// const mnemonic = db.collection("mnemonic");
// }

// function generate() {
// generate.prototype.words = bip39.generateMnemonic();
// generate.prototype.wordsArr = bip39.generateMnemonic().split(' ');
// }
// Mnemonic.prototype.generate = function() {
//     const words = bip39.generateMnemonic();
//     const wordsArr = bip39.generateMnemonic().split(' ');
// }
// }