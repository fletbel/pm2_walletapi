const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const assert = require('assert');
const client = require('../models/client');
// const client = require('../models/client.js');


function Wallet(mnemonic, bip44Idx) {

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const bitcoinNetwork = client.tbsys;
    const hdMaster = bitcoin.bip32.fromSeed(seed, bitcoinNetwork);
    const key = hdMaster.derivePath("m/44'/1'/0'/0/0");
    const keyWIF = key.toWIF();
    const keyAddr = getAddress(key, bitcoinNetwork);
    return {
        key: key,
        keyWIF: keyWIF,
        address: keyAddr
    }
}


// function wallet(mnemonic) {
module.exports = Wallet;

function getAddress(node, network) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}
//  // const mnemonic = bip39.generateMnemonic();
//     // const mnemonic = "body lamp morning brass paddle copy deputy there course civil mammal yard";
//     // addr: mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
//     // const seed = bip39.mnemonicToSeedSync(mnemonic);
//     // console.log(mnemonic);
//     // console.log(JSON.stringify(seed));
//     // const bitcoinNetwork = bitcoin.networks.bitcoin
//     // const bitcoinNetwork = bitcoin.networks.testnet;

//     // const bitcoinNetwork = tbsys; //이거를 사용하시오

//     // const hdMaster = bitcoin.bip32.fromSeed(seed, bitcoinNetwork);
//     // console.log(JSON.stringify(hdMaster));
//     const key1 = hdMaster.derivePath("m/44'/1'/0'/0/0");
//     const key2 = hdMaster.derivePath("m/44'/1'/0'/0/1");
//     console.log('\n key1:' + JSON.stringify(key1));
//     console.log('\n key2:' + JSON.stringify(key2));

//     const key1WIF = key1.toWIF();
//     const key2WIF = key2.toWIF();
//     console.log('\n key1.toWIF():' + key1WIF);
//     console.log('\n key2.toWIF():' + key2WIF);

//     // console.log('\n key2:' + key2);
//     const dstWallet = 'mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd';
//     const key1Addr = getAddress(key1, tbsys);
//     const key2Addr = getAddress(key2, tbsys);

//     console.log('\n key1Addr:' + key1Addr);
//     console.log('\n key1Addr:' + key2Addr);

//     // const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//     // console.log('\nalice: ' + JSON.stringify(alice));
//     const utxo = '9defc442eab7be8304219c7f6085ba805651753dbbe10f5f8e4b26c5130c30c3';

//     console.log('\nbitcoin.networks.testnet' + JSON.stringify(bitcoin.networks.testnet));
//     console.log('\ntbsys: ' + JSON.stringify(tbsys));

//     // dhttp({
//     //     method: 'POST',
//     //     url: 'https://testnet.bsysexplorer.com/',
//     //     //url: 'http://tbtc.blockr.io/api/v1/tx/push',
//     //     body: txb.build().toHex()
//     // }, done)


//     function sendTXtoSelf(key, utxo, dstAddr, amount) {
//         // const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//         const alice = bitcoin.ECPair.fromWIF(key, tbsys);
//         console.log('\nalice: ' + JSON.stringify(alice));
//         const txb = new bitcoin.TransactionBuilder(tbsys);

//         txb.setVersion(1);
//         // txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); // Alice's previous transaction output, has 15000 satoshis
//         txb.addInput(utxo, 0);
//         txb.addOutput(dstAddr, amount);
//         // (in)15000 - (out)12000 = (fee)3000, this is the miner fee
//         // txb.sign({
//         //     prevOutScriptType: 'p2pkh',
//         //     vin: 0,
//         //     keyPair: alice
//         // });
//         txb.sign(0, alice);
//         return txb;
//     }
//     let txb = sendTXtoSelf(key1WIF, utxo, dstWallet, 10000); // amount = satoshis
//     txb = txb.build().toHex();
//     console.log('\ntxb: ' + JSON.stringify(txb));




// const bitcoin = require('bitcoinjs-lib');
// const bip32 = require('bip32');
// const bip39 = require('bip39');
// const assert = require('assert');
// const client = require('../models/client');
// // const client = require('../models/client.js');


// const bitcoinNetwork = client.tbsys;

// function Wallet(mnemonic) {
//     console.log(mnemonic);
//     const seed = bip39.mnemonicToSeedSync(mnemonic);
//     // this.mnemonic = bip39.generateMnemonic(); // 이후에 함수로 구현해 db에 저장
//     // this.seed = bip39.mnemonicToSeedSync(mnemonic);
//     // Wallet.prototype.generate = () => {

// }

// Wallet.prototype.generate = (seed, bip44Idx) => {
//     console.log(seed);
//     hdWalletMaster = bitcoin.bip32.fromSeed(Zseed, bitcoinNetwork);
//     const key = hdWalletMaster.derivePath(bip44Idx);
//     const keyToWIF = key.toWIF();
//     const address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, bitcoinNetwork }).address
//     return {
//         key: key,
//         keyToWIF: keyToWIF,
//         address: address
//     }
// }
// module.exports = {
//     seed: Wallet.seed,
//     generate: Wallet.prototype.generate()
// };











// const bitcoin = require('bitcoinjs-lib');
// const bip32 = require('bip32');
// const bip39 = require('bip39');
// const assert = require('assert');
// const client = require('../models/client');
// // const client = require('../models/client.js');


// const bitcoinNetwork = client.tbsys;

// // function wallet(mnemonic) {
// module.exports = {
//     // this.mnemonic = bip39.generateMnemonic(); // 이후에 함수로 구현해 db에 저장
//     getSeed: () => {
//         bip39.mnemonicToSeedSync(mnemonic);
//     },
//     generate: (bip44Idx) => {
//             hdWalletMaster = bitcoin.bip32.fromSeed(Wallet.prototype.seed, bitcoinNetwork);
//             const key = hdWalletMaster.derivePath(bip44Idx);
//             const keyToWIF = key.toWIF();
//             const address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, bitcoinNetwork }).address
//             return {
//                 key: key,
//                 keyToWIF: keyToWIF,
//                 address: address
//             }
//         }
//         // Wallet.prototype.generate = () => {
//         // Wallet.prototype.seed = bip39.mnemonicToSeedSync(mnemonic);
//         // console.log(seed);

// };