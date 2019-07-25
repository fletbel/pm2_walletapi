const bitcoin = require('bitcoinjs-lib');
const client = require('../models/client')

// 데이터베이스 컬렉션 id와 문자를 입력받고 단어를 생성
// 단어로 비밀번호를 생성 해 비밀번호 입력시마다 비밀번호를 디코딩하고 주소를 찾아내야 하나
// 이 api에선 비밀번호를 디코딩했다 가정하고 데이터베이스에 저장. 추후에 비밀번호로 로그인 하도록 추가
function createAddress(collection, string) { // 컬렉션 id와 단어를 입력
    const tbsys = client.tbsys; // bsys 테스트넷
    // const mnemonic = string;
    const bitcoinNetwork = tbsys;
    const hdMaster = bitcoin.bip32.fromSeed(seed, bitcoinNetwork);
    const key1 = hdMaster.derivePath("m/44'/1'/0'/0/0");
    const key2 = hdMaster.derivePath("m/44'/1'/0'/0/1");

    const key1WIF = key1.toWIF();
    const key2WIF = key2.toWIF();
    console.log('\n key1.toWIF():' + key1WIF);
    console.log('\n key2.toWIF():' + key2WIF);

    const dstWallet = 'mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd';
    const key1Addr = getAddress(key1, tbsys);
    const key2Addr = getAddress(key2, tbsys);

    console.log('\n key1Addr:' + key1Addr);
    console.log('\n key1Addr:' + key2Addr);
}


module.exports = mnemonicGenerator;

// mongoose.connection.collection(collection).insertMany([{ data: string }],


// mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
// mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd
// addr: mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
// const seed = bip39.mnemonicToSeedSync(mnemonic);
// const mnemonic = bip39.generateMnemonic();

// console.log(mnemonic);
// console.log(JSON.stringify(seed));
// const bitcoinNetwork = bitcoin.networks.bitcoin
// const bitcoinNetwork = bitcoin.networks.testnet;

// console.log(JSON.stringify(hdMaster));


// console.log('\n key1:' + JSON.stringify(key1));
// console.log('\n key2:' + JSON.stringify(key2));

// console.log('\n key2:' + key2);


// const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
// console.log('\nalice: ' + JSON.stringify(alice));
// const utxo = '9defc442eab7be8304219c7f6085ba805651753dbbe10f5f8e4b26c5130c30c3';

// console.log('\nbitcoin.networks.testnet' + JSON.stringify(bitcoin.networks.testnet));
// console.log('\ntbsys: ' + JSON.stringify(tbsys));




//===============================================================

// dhttp({
//     method: 'POST',
//     url: 'https://testnet.bsysexplorer.com/',
//     //url: 'http://tbtc.blockr.io/api/v1/tx/push',
//     body: txb.build().toHex()
// }, done)


// function sendTXtoSelf(key, utxo, dstAddr, amount) {
//     // const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//     const alice = bitcoin.ECPair.fromWIF(key, tbsys);
//     console.log('\nalice: ' + JSON.stringify(alice));
//     const txb = new bitcoin.TransactionBuilder(tbsys);

//     txb.setVersion(1);
//     // txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); // Alice's previous transaction output, has 15000 satoshis
//     txb.addInput(utxo, 0);
//     txb.addOutput(dstAddr, amount);
//     // (in)15000 - (out)12000 = (fee)3000, this is the miner fee
//     // txb.sign({
//     //     prevOutScriptType: 'p2pkh',
//     //     vin: 0,
//     //     keyPair: alice
//     // });
//     txb.sign(0, alice);
//     return txb;
// }
// let txb = sendTXtoSelf(key1WIF, utxo, dstWallet, 10000); // amount = satoshis
// txb = txb.build().toHex();
// console.log('\ntxb: ' + JSON.stringify(txb));





// key1Addr: mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
// key1Addr: mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd
// key1: L2TXXS3o9SawrqRc2xUQmfGdu5VGXpmvNZp1uUBupgWJc3JEguQb


// const txid = sendTransaction(key1WIF, key1Addr);

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

// let writeData = `mnemonic: ${mnemonic}\nAddress: ${key1Addr}\nblockCount: ${bc}`;


// res.send(txb)

// client.getBlockCount(key1Addr).then((bc) => {
//     console.log(`blockCount: ${bc}`);
// }).catch((err) => {
//     // log(`Error getBlock at blockresult/getblock - RPC 'bitcoin-core'`, `Error`, err);
//     console.log('Err while getting blockcount: ' + err);
//     // });
// });
// const txid = sendTransaction(key1WIF, key1Addr);

// function sendBTC(paperWallet, toAddress, amount, txID) {
//     const keyPair = bitcoin.ECPair.fromWIF(paperWallet.privateKey, tbsys.networks.testnet)
//     const txb = new bitcoin.TransactionBuilder()
//     txb.addInput(txID, 0) // previous transactionId from the address at index 0
//     txb.addOutput(toAddress, amount)
//     txb.sign(0, keyPair)
//     txb.build().toHex()
//     console.log('transfer successful')
// }
// sendBTC(key1Addr, key1WIF, 1, txid)


//     let writeData = `mnemonic: ${mnemonic}\nAddress: ${key1Addr}\nUTXO: ${utxo}
// \naddress1: ${key1Addr}\naddress2: ${key2Addr}`;