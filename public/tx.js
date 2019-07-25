const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const assert = require('assert');
const client = require('../models/client');
const httpRequest = require('../libs/http');

// function createTx(wallet, dstAddr, amount, utxo) {
module.exports = (wallet, dstAddr, amount, utxo) => {
    return new Promise(resolve => {
        // console.log('\n tx.js createTx parameters');
        // console.log('\n wallet: ' + JSON.stringify(wallet));
        // console.log('\n dstAddr: ' + dstAddr);
        // console.log('\n amount: ' + amount);
        // console.log('\n utxo: ' + utxo);
        const fee = 100000;
        let selectedUtxo = JSON.parse(utxo).Contents;
        selectedUtxo = selectedUtxo[0];

        const txb = new bitcoin.TransactionBuilder(client.tbsys);

        //args : utxo, utxo vout
        txb.addInput(selectedUtxo.txid, selectedUtxo.vout); //tx from testnet
        txb.addOutput(wallet.address, (selectedUtxo.satoshis - Number(amount) - fee));
        txb.addOutput(dstAddr, Number(amount)); //dst addr, satoshi

        // console.log('\naddoutputSuccess: ' + dstAddr + ' ' + Number(amount));
        const privKey = wallet.keyWIF;
        txb.sign(0, wallet.key)
        let tx = txb.build().toHex();

        resolve(tx);
    });
}



function computeChange(coins, amount) {
    console.log(coins);
    // Create a array that is used to return the final result, instead of the global one.
    var coincount = [];

    // use the given `amount` to set `creminder ` rather than `AMOUNT` which may not be accessible if your code is called otherplace rather than here.
    var i = 0;
    let creminder = amount;
    let ccoin;

    while (i < coins.length) {
        // Lazily init the used coin for coin type i to 0.
        coincount[i] = 0;
        while (coins[i].satoshis <= creminder) {
            creminder = creminder - coins[i].satoshis;
            ccoin = coincount[i];
            ccoin += 1;
            coincount[i] = ccoin;
        }
        i++;
    }
    return coincount;
}

function rightJustify(s, w) {
    // return a string of width w with s in the rightmost characters and
    // at least one space on the left. For simplicity, assume w < 20.
    var slen = s.length;
    var blanks = "                    "
    return blanks.substr(0, Math.min(20, Math.max(1, w - slen))) + s;
}

function makeChange() {
    // compute change as an array: each element of change tells
    // how many of the corresponding value in COINS to give. The
    // total value should equal AMOUNT.
    var change = computeChange(COINS, AMOUNT);
    // now format the results. Output should look like:
    // NUMBER   VALUE
    //    1       50
    //    0       25
    //    1       10
    //    1        5
    //    3        1
    // TOTAL AMOUNT: 68 (total is correct)
    //
    // First, we'll do some type checking in case change is not of the
    // expected type.
    change = [].concat(change); // force whatever it is to be an array
    // it should be an array of numbers, so let's check
    for (i = 0; i < change.length; i++) {
        if (typeof(change[i]) != 'number') {
            return "Error: the function computeChange did not return " +
                "an array of numbers.";
        }
    }
    if (change.length > COINS.length) {
        return "Error: the function computeChange returned an array " +
            "longer than the length (" + COINS.length + ") of COINS.";
    }
    if (change.length < COINS.length) {
        return "Error: the function computeChange returned an array " +
            "shorter than the length (" + COINS.length + ") of COINS.";
    }
    var output = "<pre>NUMBER   VALUE\n"
    var sum = 0;
    for (i = 0; i < change.length; i++) {
        sum += change[i] * COINS[i];
        var n = change[i].toString();
        var a = COINS[i].toString();
        output += rightJustify(n, 4) + rightJustify(a, 9) + "\n";
    }
    output += "TOTAL AMOUNT: " + sum + " (total is ";
    output += (sum == AMOUNT ? "correct" :
        "incorrect, should be " + AMOUNT) + ")\n";
    return output;
}

function getFinestUtxo(utxo, amount) {

    function abandonLowAmountUtxo(utxo) {
        return new Promise(resolve => {
            // let satoshiArr = 
            let utxoArr = utxo.filter((id) => {
                return id.satoshis >= amount;
            });
            const dataArray = new Array;
            for (let satoshis in utxo) {
                dataArray.push(utxo[satoshis]);
            }
            resolve(dataArray);
        });
    };

    abandonLowAmountUtxo(JSON.parse(utxo).Contents).then((result) => {
        console.log('\nabandonLowAmountUtxo result: ');
        console.log(result);
    });
}




// const utxoSearched = computeChange(JSON.parse(utxo).Contents, amount);
// console.log('\nutxoSearched: ');
// console.log(utxoSearched);

// console.log('\nselectedUtxo: ');
// console.log(selectedUtxo[0]);

// console.log(client.tbsys.pubKeyHash);

// const txb = new bitcoin.TransactionBuilder(client.tbsys);
// console.log(client.tbsys.pubKeyHash);

// //args : utxo, utxo vout
// txb.addInput('448dc99498969a010c2741f370783bf921187e88164147783aca7617df8f590f', 0); //tx from testnet

// // console.log(txb);
// txb.addOutput('mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf', 10000000000 - amount);
// txb.addOutput('mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd', 10000); //dst addr, satoshi

// console.log('\nNumber(amount): ' + Number(amount));

// console.log('\nselectedUtxo.txid: ' + selectedUtxo.txid);
// console.log('\nselectedUtxo.vout: ' + selectedUtxo.vout);
// console.log('\nwallet.address: ' + wallet.address);
// console.log('\nselectedUtxo.satoshis - amount: ' + (selectedUtxo.satoshis - Number(amount)));

// console.log(txb);
// console.log('\nprint type: ' + typeof(wallet.address) + ' ' + typeof(amount) + ' ' + amount)

// const pubKey = wallet.key.getAddress();
// console.log('\ntbsys: ');
// console.log(client.tbsys);
// const keyPair = bitcoin.ECPair.fromWIF(wallet.keyWIF, client.tbsys);
// console.log('\nprivkey: ' + privKey);

// txb.sign(0);

// console.log('\ntx: ');
// console.log(tx);

// const sendTxResult = sendTx();
// resolve(sendTxResult());




// function sendTx() {
//     httpRequest.sendTx(getWalletAddress, txResult).then((result) => {
//         return result;
//     });
// }

// module.exports = {
//     createTx: createTx
// };

// let utxoArr = "";
// utxo.forEach((amount) => {
//     if (this.amount > amount)
//         utxoArr.push(this);
// });
// return utxo;





// function getAddress(node, network) {
//     return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
// }




// const txb = new bitcoin.TransactionBuilder()
// txb.addInput('4303caa91ca5a2236396af3bfae26b70a223a2bcee2fe8d23a7b24626c3c4bd2', 1);

// txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 100000);
// txb.addOutput('1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP', 398130);
// const privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy';
// const keyPair = bitcoin.ECPair.fromWIF(yourAddressPrivateKeyWIF);
// txb.sign(0, yourAddresskeyPair)

// function sendTXtoSelf(key, utxo, dstAddr, amount) {
//     // const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//     //     const alice = bitcoin.ECPair.fromWIF(key, tbsys);
//     //     console.log('\nalice: ' + JSON.stringify(alice));
//     const txb = new bitcoin.TransactionBuilder(tbsys);
//     // 9defc442eab7be8304219c7f6085ba805651753dbbe10f5f8e4b26c5130c30c3
//     txb.addInput('448dc99498969a010c2741f370783bf921187e88164147783aca7617df8f590f', 0);
//     console.log(txb);
//     //     txb.setVersion(1);
//     // txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); // Alice's previous transaction output, has 15000 satoshis
//     //     txb.addInput(utxo, 0);
//     //     txb.addOutput(dstAddr, amount);
//     //     // (in)15000 - (out)12000 = (fee)3000, this is the miner fee
//     //     // txb.sign({
//     //     //     prevOutScriptType: 'p2pkh',
//     //     //     vin: 0,
//     //     //     keyPair: alice
//     //     // });
//     //     txb.sign(0, alice);
//     //     return txb;
//     // }
//     // let txb = sendTXtoSelf(key1WIF, utxo, dstWallet, 10000); // amount = satoshis
//     // txb = txb.build().toHex();
//     // console.log('\ntxb: ' + JSON.stringify(txb));
// };








// module.exports = function(walletInfo, outputAddr, network, utxo) {
// module.exports = function() {
// const outputAddress = "mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd";
// console.log('walletInfo.keyWIF: ' + walletInfo.keyWIF);
// console.log('walletInfo.address :' + walletInfo.address);
// const txid = sendTransaction(walletInfo.keyWIF, outputAddress, client.tbsys);
// const tx = bitcoin.Transaction.fromRaw('448dc99498969a010c2741f370783bf921187e88164147783aca7617df8f590f');
// // var txb = new bitcoin.TransactionBuilder.fromTransaction(bitcoinjs.Transaction.fromHex(txhex), client.tbsy);
// const txid = tx.getId();
// console.log(txid);
// return txid;
// return 1;
// };

// function sendTransaction(inputKey, outputAddr, network, utxo, amount) {
//     // let key = bitcoin.ECPair.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
//     let key = bitcoin.ECPair.fromWIF(inputKey, network);
//     console.log('key: ');
//     console.log(key);
//     let tx = new bitcoin.TransactionBuilder();
//     // console.log('tx : ');
//     // console.log(tx);
//     for (let i = 0; i < utxo.length; i++)
//         tx.addInput(utxo[i].txid, utxo[i].vout);
//     // tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
//     tx.addOutput(outputAddr, amount);
//     tx.sign(0, key);
//     tx.build().toHex()
//         // console.log(tx.build().toHex());
//     return tx;
// }

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