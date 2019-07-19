    // const tx = sendTransaction();

    //주소로부터 bitcoinjs-lib로 트랜잭션 만들고 사인 후 전송
    // let key = bitcoin.ECPair.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
    // let tx = new bitcoin.TransactionBuilder();
    // tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
    // tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 149000);
    // tx.sign(0, key);
    // console.log(tx.build().toHex());


    // //주소로부터 bip32 생성
    // const addr = "xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi";
    // let node = bip32.fromBase58(addr);
    // console.log('bip32: ' + JSON.stringify(node));
    // let child = node.derivePath('m/0/0');

    // //describe 1 bip32
    // const xpriv = 'tprv8ZgxMBicQKsPd7Uf69XL1XwhmjHopUGep8GuEiJDZmbQz6o58LninorQAfcKZWARbtRtfnLcJ5MQ2AtHcQJCCRUcMRvmDUjyEmNUWwx8UbK';
    // const newNode = bip32.fromBase58(xpriv, bitcoin.networks.testnet);
    // assert.strictEqual(newNode.toWIF(), 'cQfoY67cetFNunmBUX5wJiw3VNoYx3gG9U9CAofKE6BfiV1fSRw7');

    // //bip39 mnemonic 단어생성
    // let phrase = bip39.generateMnemonic();
    // console.log('bip39: ' + phrase);

    // //bip39 mnemonic 단어로부터 bip32 시드로
    // // const mnemonic = bip39.generateMnemonic();
    // const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost';
    // assert(bip39.validateMnemonic(mnemonic));
    // console.log('assert mnemonic' + mnemonic);
    // const seed = bip39.mnemonicToSeedSync(mnemonic);
    // const root = bip32.fromSeed(seed);

    // const string = root.neutered().toBase58();
    // const restored = bip32.fromBase58(string);
    // console.log(`\n\nmnemonic: ${mnemonic}`);
    // console.log('\n\nseed:');
    // console.log(seed);
    // console.log(`\n\nnode: ${JSON.stringify(root)}\n\nstring: ${string}\n\nrestored: ${JSON.stringify(restored)}`);

    //bip39 mnemonic 단어로부터 bip32 시드에서 bip44로
    // const root = bip32.fromSeed(Buffer.from('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'hex'));
    // const child1 = root.derivePath("m/44'/0'/0'/0/0");
    // const child1b = root.deriveHardened(0).derive(0).derive(0)
    // const child1String = child1.neutered().toBase58();
    // const child1Restored = bip32.fromBase58(child1String);
    // const child1bString = child1b.neutered().toBase58();
    // const child1bRestored = bip32.fromBase58(child1bString);
    // console.log('\n\nchild1:' + child1);
    // console.log('\n\nchild1b:' + child1b);
    // assert.strictEqual(getAddress(child1), '1JHyB1oPXufr4FXkfitsjgNB5yRY9jAaa7');
    // assert.strictEqual(getAddress(child1b), '1JHyB1oPXufr4FXkfitsjgNB5yRY9jAaa7');

    // const xpriv2 = string;
    // const nodeXpriv = bip32.fromBase58(xpriv2, bitcoin.networks.testnet);
    // console.log(nodeXpriv);






    // const mnemonic = bip39.generateMnemonic()
    //     // const mnemonic = 'praise you muffin lion enable neck grocery crumble super myself license ghost'
    // assert(bip39.validateMnemonic(mnemonic))

    // const seed = bip39.mnemonicToSeedSync(mnemonic)
    // const root = bip32.fromSeed(seed)
    // console.log('\n mnemonic: ' + mnemonic);
    // console.log('\n seed: ' + JSON.stringify(seed));
    // console.log('\n root: ' + JSON.stringify(root));

    // const child1 = root.derivePath("m/44'/1'/0'/0/0")
    // console.log('\n child1: ' + JSON.stringify(child1));


    // const string = root.neutered().toBase58();
    // const restored = bip32.fromBase58(string);
    // console.log('\n string: ' + string);
    // console.log('\n restored: ' + JSON.stringify(restored));


    // const root2 = bip32.fromSeed(Buffer.from('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', 'hex'))
    // const child2 = root2.derivePath("m/44'/61'/0'/0/0")
    // console.log('\n root2: ' + JSON.stringify(root2));
    // console.log('\n child2: ' + JSON.stringify(child2));

    // const string1 = root2.neutered().toBase58();
    // const string3 = child1.neutered().toBase58();

    // console.log('\n string1: ' + JSON.stringify(string1));
    // console.log('\n string3: ' + JSON.stringify(string3));
    // // // receive addresses
    // // const a = assert.strictEqual(getAddress(root.derivePath("m/0'/0/0")), '1AVQHbGuES57wD68AJi7Gcobc3RZrfYWTC')
    // // const b = assert.strictEqual(getAddress(root.derivePath("m/0'/0/1")), '1Ad6nsmqDzbQo5a822C9bkvAfrYv9mc1JL')

    // // // change addresses
    // // const c = assert.strictEqual(getAddress(root.derivePath("m/0'/1/0")), '1349KVc5NgedaK7DvuD4xDFxL86QN1Hvdn')
    // // const d = assert.strictEqual(getAddress(root.derivePath("m/0'/1/1")), '1EAvj4edpsWcSer3duybAd4KiR4bCJW5J6')

    // const a1 = getAddress(root.derivePath("m/0'/0/0"));
    // console.log('\n a1:' + a1);

    // // M/44'/60'/0'/0/2 : 메인 이더리움 계정에 대한 세 번째 수신 공개키
    // const b1 = getAddress(root.derivePath("m/44'/1'/0'/0/0"));
    // console.log('\n b1:' + b1);

    // const randomBytes = crypto.randomBytes(16) // 128 bits is enough











<--- Last few GCs --->

[16808:0x321b9b0]    34505 ms: Mark-sweep 1386.6 (1417.8) -> 1384.8 (1412.8) MB, 1433.0 / 0.0 ms  (+ 0.0 ms in 31 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 1491 ms) (average mu = 0.155, current mu = 0.078) allocati[16808:0x321b9b0]    34538 ms: Scavenge 1391.1 (1418.3) -> 1390.3 (1419.8) MB, 6.9 / 0.0 ms  (average mu = 0.155, current mu = 0.078) allocation failure 


<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 0x3c1fed5be1d]
Security context: 0x35af2401e6e1 <JSObject>
    1: _writeRaw [0x31f6f85b76a1] [_http_outgoing.js:~241] [pc=0x3c1ff054a59](this=0x0f67a5e0b229 <ServerResponse map = 0x278c50f507a9>,data=0x09e2ccf8fa91 <Uint8Array map = 0x3362916d1ca1>,encoding=0x3e6f867022b1 <null>,callback=0x3e6f867026f1 <undefined>)
    2: /* anonymous */ [0xf67a5e0b2d1] [/home/fletbel/work/pm2_walletapi/web.js:~111] [pc=0x3c1ff04f79c...

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x8dc1c0 node::Abort() [node]
 2: 0x8dc20c  [node]
 3: 0xad60ae v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [node]
 4: 0xad62e4 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [node]
 5: 0xec3972  [node]
 6: 0xec3a78 v8::internal::Heap::CheckIneffectiveMarkCompact(unsigned long, double) [node]
 7: 0xecfb52 v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [node]
 8: 0xed0484 v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [node]
 9: 0xed30f1 v8::internal::Heap::AllocateRawWithRetryOrFail(int, v8::internal::AllocationSpace, v8::internal::AllocationAlignment) [node]
10: 0xe9c574 v8::internal::Factory::NewFillerObject(int, bool, v8::internal::AllocationSpace) [node]
11: 0x113bffb v8::internal::Runtime_AllocateInTargetSpace(int, v8::internal::Object**, v8::internal::Isolate*) [node]
12: 0x3c1fed5be1d 
중지됨 (core dumped)















    //     res.writeHead("200", {
    //         "Content-Type": "text/html;charset=utf8"
    //     });
    //     res.write('단어를 종이에 적고 다음을 누르세요<br>');
    //     // mnemonic.words;
    //     // console.log(mnemonic.words);
    //     // const a = mnemonic.words;
    //     // console.log(a);

    // db.insertMany('mnemonic', Mnemonic.words);
    //     console.log('words: ' + Mnemonic.words);
    //     console.log('wordsArr: ' + Mnemonic.wordsArr);
    //     // db.insertDocument('mnemonic', Mnemonic.words);
    //     const jsonObj = {
    //         name: 'app'
    //     }
    // e

    //     // console.log(db.insertOne);

    //     for (let i = 0; i < Mnemonic.wordsArr.length; i++)
    //         res.write(`\n${i+1}: ${Mnemonic.wordsArr[i]}<br>`);
    //     delete Mnemonic;

    //     res.write('<form action="/show_words" />');
    //     res.write('<input type="submit" id="gen_words" value="재생성" />');
    //     res.write('</form>');
    //     res.write('<form action="check_words" />');
    //     res.write('<input type="submit" id="gen_words" value="다음" />');
    //     res.write('</form>');
    //     res.end();








            <form action="show_words" method="get">
            <input type="submit" display="hidden" id="gen_words" value="지갑생성하기" />
        </form>





        // app.post('/create_address', (req, res) => {


//     // mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
//     // mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd
//     // const mnemonic = bip39.generateMnemonic();
//     const mnemonic = "body lamp morning brass paddle copy deputy there course civil mammal yard";
//     // addr: mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
//     const seed = bip39.mnemonicToSeedSync(mnemonic);
//     console.log(mnemonic);
//     console.log(JSON.stringify(seed));
//     console.log('client.tbsys');
//     console.log(client.tbsys);
//     // const bitcoinNetwork = bitcoin.networks.bitcoin
//     // const bitcoinNetwork = bitcoin.networks.testnet;
//     const tbsys = client.tbsys;
//     const bitcoinNetwork = tbsys;
//     const hdMaster = bitcoin.bip32.fromSeed(seed, bitcoinNetwork);
//     console.log(JSON.stringify(hdMaster));
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
//     // const utxo = '9defc442eab7be8304219c7f6085ba805651753dbbe10f5f8e4b26c5130c30c3';

//     // console.log('\nbitcoin.networks.testnet' + JSON.stringify(bitcoin.networks.testnet));
//     console.log('\ntbsys: ' + JSON.stringify(tbsys));


//     // function sendTXtoSelf(key, utxo, dstAddr, amount) {
//     //     // const alice = bitcoin.ECPair.fromWIF('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
//     //     const alice = bitcoin.ECPair.fromWIF(key, tbsys);
//     //     console.log('\nalice: ' + JSON.stringify(alice));
//     //     const txb = new bitcoin.TransactionBuilder(tbsys);

//     //     txb.setVersion(1);
//     //     // txb.addInput('61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d', 0); // Alice's previous transaction output, has 15000 satoshis
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

//     res.json({
//         mnemonic: mnemonic,
//         bitcoinNetwork: bitcoinNetwork,
//         hdMaster: hdMaster,
//         key1: key1,
//         key2: key2,
//         key1WIF,
//         key2WIF,
//         key1Addr,
//         key2Addr,
//     });
// });
