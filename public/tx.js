const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const assert = require('assert');
const client = require('../models/client');

module.exports = function(walletInfo, outputAddr, network) {
    const outputAddress = "mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd";
    console.log('walletInfo.keyWIF: ' + walletInfo.keyWIF);
    console.log('walletInfo.address :' + walletInfo.address);
    const txid = sendTransaction(walletInfo.keyWIF, outputAddress, client.tbsys);
    return txid;
};

function sendTransaction(inputKey, outputAddr, network) {
    // let key = bitcoin.ECPair.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
    let key = bitcoin.ECPair.fromWIF(inputKey, network);
    console.log('key: ');
    console.log(key);
    let tx = new bitcoin.TransactionBuilder();
    console.log('tx : ');
    console.log(tx);
    // tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
    // tx.addOutput(outputAddr, 149000);
    // tx.sign(0, key);
    // console.log(tx.build().toHex());
    // return tx;
}

// function getAddress(node, network) {
//     return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
// }

// function sendBTC(paperWallet, toAddress, amount, txID) {
//     const keyPair = bitcoin.ECPair.fromWIF(paperWallet.privateKey, tbsys.networks.testnet);
//     const txb = new bitcoin.TransactionBuilder();
//     txb.addInput(txID, 0); // previous transactionId from the address at index 0
//     txb.addOutput(toAddress, amount);
//     txb.sign(0, keyPair);
//     txb.build().toHex();
//     console.log('transfer successful');
// };
// sendBTC(key1Addr, key1WIF, 1, txid)