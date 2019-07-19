const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const client = require('./models/client.js')
const dhttp = require('dhttp/200.js')
const path = require('path');
const wallet = require('./public/wallet');
const mnemonic = require('./public/mnemonic');
const tx = require('./public/tx');
const qr = require('./public/qr');
const db = require("./libs/database");
const mongoose = require('mongoose');

const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');
const assert = require('assert');



process.on('message', function(packet) {
    if (packet.data.target === 'web') {
        console.log('web:\n', packet.data);
    }
});

db.connect("mongodb://localhost:27017/walletapi", (err) => {
    console.log('dbconnect Error callback: ' + err);
});

app.use(express.static(path.join(__dirname, 'public')));

app.set('routes', path.join(__dirname, 'routes'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.get('/mnemonic', (req, res) => {
    db.find('mnemonic').then((result) => {
        res.json({
            mnemonic: result
        });
    }).catch((err) => {
        console.log('db.find Error at app.get("/mnemonic"): ' + err);
    });
});

app.get('/', (req, res) => {
    const collection = 'mnemonic';
    db.find(collection).then((result) => {
        if (result && result.auth)
            res.render('wallet');
        else if (result && !result.auth && result.data) {
            db.drop(collection);
            res.redirect('/');
        } else
            res.render('index', {
                mnemonic: result
            });
    });
});

app.post('/init_mnemonic', (req, res) => {
    const Mnemonic = new mnemonic();
    const mnemonicWords = Mnemonic.words;
    delete Mnemonic;
    db.find('mnemonic').then((result) => {
        if (result != null)
            db.drop('mnemonic');
        db.insertMany('mnemonic', {
            data: mnemonicWords
        });
        console.log('mnemonicWords: ' + mnemonicWords);
        res.json(mnemonicWords);
    })
});

app.get('/show_words', (req, res) => {
    res.render('show');
});



app.post('/wallet', (req, res) => {
    console.log('wallet' + req.body.input_word);
    db.find('mnemonic').then((result) => {
        let status = "";
        const mnemonic = result;
        if (result) {
            const wordsArr = mnemonic.data.split(' ');
            for (var value of wordsArr)
                if (value == req.body.input_word)
                    status = 'success';
        } else
            status = 'Not found';
        if (status == 'success') {
            const auth = {
                auth: true
            };
            db.updateOne('mnemonic', mnemonic, auth);
            res.render('wallet');
        } else
            res.render('/', {
                status: status
            });
    });
});

app.post('/check_words', (req, res) => {
    db.find('mnemonic').then((result) => {
        let status = "";
        if (result) {
            const wordsArr = result.data.split(' ');
            for (var value of wordsArr)
                if (value == req.body.word)
                    status = 'success';
        } else
            status = 'Not found';
        if (status == 'success')
            res.render('wallet');
        else
            res.json('Not found');
    });
});

app.post('/get_mnemonic', (req, res) => {
    db.find('mnemonic').then((result) => {
        console.log(result);
        res.json(result.data);
    })
});

app.post('/create_wallet', (req, res) => {
    db.find('mnemonic').then((result) => {
        const Wallet = new wallet(result.data, 0);
        // console.log('\nWallet: ');
        // console.log(Wallet);
        res.json(Wallet);
        delete Wallet;
    });
});

// 

app.post('/qr', function(req, res) {
    const qrString = qr(req.body.addr);
    res.json(qrString);
});

app.post('/wire', function(req, res) {
    db.find('wallet').then((result) => {
        let a = tx(result);
        console.log('tx result');
        console.log(a);

        const dstAddr = "mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd";
        const pubKey = result.keyWIF;
    })
    res.json('wire success');
});

app.listen(8123, () => {
    console.log('Listening on port 8123');
});

function getParams() {
    const Params = [];
    process.argv.forEach(function(val, index, array) {
        // console.log(val[0]);
        if (val[0] != '/')
            Params.push(val);
        // console.log(val.split(0, 1));
    });
    return Params;
}


// 기본 주소 : testnet.bsysexplorer.com/


// [트랜잭션 히스토리]
// /new/gettxlist/[address]



// [UTXO]
// /new/getutxos/[address]


// [잔액 조회]
// /new/getbalance/[address]


// [트랜잭션 전송]
// /new/sendtx
// {
//   "address":[address],
//   "hexstring":[hexstring]
// }




// [balance]
// https://testnet.bsysexplorer.com/new/getbalance/mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf


// [gxlist]
// https://testnet.bsysexplorer.com/new/gettxlist/mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf



// [utxo]
// https://testnet.bsysexplorer.com/new/getutxos/mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf



// [sendtx] - post
// https://testnet.bsysexplorer.com/new/sendtx/


// body
// {
// 	"hexstring":"01000000~~~~",
// 	"from":"mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf"
// }


// key1.towif():L2TXXS3o9SawrqRc2xUQmfGdu5VGXpmvNZp1uUBupgWJc3JEguQb
// key2.towif():L1Zgv18kHAnPgEVu8cgcSPvVuf6qdwmwsMFetwiFgLuzB3DP73a3
// key1Addr:mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf
// key2Addr: mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd

/*  bsys network prefix

bsys: {
  messagePrefix: '\x15Bsys Signed Message:\n',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4
  },
  pubKeyHash: 0x19,
  scriptHash: 0x3f,
  wif: 0x80 
},
tbsys: {
  messagePrefix: '\x15Bsys Signed Message:\n',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394
  },
  pubKeyHash: 0x6e,
  scriptHash: 0x80, 
  wif: 0xEF
}

bsys : 메인넷
tbsys: 테스트넷

wif : https://en.bitcoin.it/wiki/Wallet_import_format

prefix :
https://en.bitcoin.it/wiki/List_of_address_prefixes

prefix는 여기 링크 참고하시면 되는데
scriptHash는 사용하지않아서 무시하셔도 되고
pubKeyHash값을 기준으로 코인 주소 맨 앞글자를 나타내고
(bsys의 25는 Leading symbol이 B라서 모든 bsys mainnet 지갑주소는 B로 시작하며
tbsys의 110은 Leading symbol이 m이라서 모든 bsys testnet 지갑주소는 m으로 시작합니다)
wif는 트랜잭션 서명할때 사용됩니다. */

// let key = bitcoin
// 비트코인 주소의 프라이빗 키를 비트코인 송금을 위해 삽입한다
//let key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");

//The above should output: 17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4

//let tx = new bitcoin.TransactionBuilder(); //tx 빌더를 통해 새 raw transaction을 생성

//nextstep
/*  1. 트랜잭션에 인풋을 추가. 인풋은 보내는 위치의 unspent 아웃풋에 대한(utxo) 해쉬
tx : d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b
add: 1EvQUoukdKY5Fw3mqAx5AnaM4qogB5k6qZ  =>  1MoK3Dxtrk3QD96oraWTCjbzwXjtHHe9h1 0.06181355 BTC
                                             17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4 0.0015     BTC
주소 17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4가 0.0015 비트코인을 1EvQUoukdKY5Fw3mqAx5AnaM4qogB5k6qZ로 부터 받았고
몇몇 코인이 1MoK3Dxtrk3QD96oraWTCjbzwXjtHHe9h1 으로 보내짐
따라서, 만약 내 코인을 주소 17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4 에서 보내기 위해선
tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
로 사용하면 된다.
    
두번째 필드는 내가 쓰고싶은 output index (vout)인데 이것은 트랜잭션 object의 vout필드의 n 값이다.
"txid":"d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b",
...
"vin":[...],
"vout":[
{
    "value":"0.06181355",
    "n":0,
    "scriptPubKey":{
        "hex":"76a914e424b522d5e5f8509e53bf17d254b63b25f1024388ac",
        "asm":"OP_DUP OP_HASH160 e424b522d5e5f8509e53bf17d254b63b25f10243 OP_EQUALVERIFY OP_CHECKSIG",
        "addresses":[
        "1MoK3Dxtrk3QD96oraWTCjbzwXjtHHe9h1"
        ],
        "type":"pubkeyhash"
    },
    "spentTxId":"018cb1267d8dbec24a004b1d1d2601eac5d1b0b9ba8df783ad935f662469615d",
    "spentIndex":0,
    "spentHeight":344729
},
{
    "value":"0.00150000",
    "n":1,
    "scriptPubKey":{
    "hex":"76a914496dbfb76f2677792da9586f7cf407bf303b58a088ac",
    "asm":"OP_DUP OP_HASH160 496dbfb76f2677792da9586f7cf407bf303b58a0 OP_EQUALVERIFY OP_CHECKSIG",
    "addresses":[
    "17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4"
    ],
    "type":"pubkeyhash"
},
...}],
    
다음은 트랜잭션의 아웃풋을 추가해야하는데 아웃풋은 코인이 보내질 장소를 일컫는다. 첫번째 필드는
코인이 보내질 public 주소이고 두번째 필드는 비트코인의 양이다(단위는 satoshis) 
주소에 있는 코인의 양보다 많이 보낼 수 없지만 트랜잭션에 관련된 코인의 양은 모두 소모되어야함.
예를들어 트랝개션에 150000이 있으면 100000을 송금하고 5만은 수수료를 채굴자에게 제공하고
남은양을 나머지 주소로 보내야 된다는 뜻. 
예제)
tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 149000); // 1000 satoshis will be taken as fee.
    
*/


/*  tx의  input과 output을 작성 후, 다음으로 트랜잭션을 sign하고 결과인 hexadicimal을 콘솔로 출력해보자  */

//tx.sign(0, key);
//console.log(tx.build().toHex());

/*  이후 출력된 hexadicimal 코드를 비트코인 네트워크에 전송한다 
    
    참고 사이트 
    https://www.blockchain.com/btc/pushtx
    https://insight.bitpay.com/tx/send

    혹은 bitcoin-core 인터페이스로 bitcoind sendrawtransaction <hex> 를 타이핑 하자.
    
전체코드 샘플

let bitcoin = require(‘bitcoinjs-lib’);
let key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
let tx = new bitcoin.TransactionBuilder();
tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 149000);
tx.sign(0, key);
console.log(tx.build().toHex());

결과) hexadicimal: 02000000018b15b54...  ...00000000 

끝.*/


/*  
    bip32 : HD지갑의 일반적인 형식과 지갑 구축 방법을 설명한 문서(Hierarchical Deterministic Wallet)
    bip39 : 결정성 열쇠를 파생하기 위한 니모닉 코드의 유형 및 bip32시드로 전환하는 프로세스
    bip44 : bip32지갑의 특정형식, 목적을 44로 설정해서 나타나는 다중화폐 다계정 제공

      
    bip44 트리 레벨구조
    
    m / purpose' / coin_type' / account' / change / address_index
    level-1 (purpose', 목적') : 항상 44'로 설정한다.
    level-2 (coin_type', 코인 종류') : 암호화폐 동전의 유형을 지정한다. 각 통화가 두 번째 레벨 아래에 자체 하위 트리를 갖는 화폐 HD 지갑을 허용한다는 의미이다. SLIP0044라는 표준 문서에는 여러 화폐가 정의되어있다. 예를들어 이더리움은 m/44'/60'이다. 모든 화폐의 테스트넷은 m/44'/61'이다.
    level-3 (account', 계정') : 사용자는 지갑을 회계 또는 조직 목적을 위한 별도의 논리적 하위 계좌로 세분화할 수 있다. 예를 들어, m/44'/0'/0', m/44'/0'/1'처럼 HD 지갑에는 2개의 비트코인 계정을 포함할 수 있다. 각 계정은 자체 하위 트리의 루트다.
    level-4 (change, 잔돈 계정 여부) : BIP44는 원래 비트코인을 위해 제작되었기 때문에 이더리움 세계와 관련이 없는 '특이점(quirk)'이 포함되었다. HD 지갑에는 2개의 하위 트리가 있는데 하나는 입금 주소 작성용이고 다른 하나는 잔액 주소 작성용이다. (이더리움은 비트코인에 있는 잔액 주소가 필요 없음므로 단지 '입금'경로만 사용하여 항상 0이다) 이전 레벨은 강화파생만 사용했지만 이 레벨은 비보안 환경에서 사용할 수 있도록 확장된 공개키를 트리의 계정 수준에서 내보낼 수 있게 하기 위해서 일반 파생을 사용한다. [1]
    level-5 (address_index, 사용 가능한 주소 인덱스) : HD 지갑에서 파생된 level-4의 자식이다.

    ex)
    M/44'/60'/0'/0/2 : 메인 이더리움 계정에 대한 세 번째 수신 공개키
    M/44'/0'/3'/1/14 : 4번째 비트코인 계정의 15번째 주소 변경 공개키 
    m/44'/2'/0'/0/1 : 트랜잭션 서명을 위한 라이트코인 메인 계정의 두 번째 개인 키

    coin-type 에 관한 내용은 현재까지 등록된 코인 리스트를 참조: https://github.com/satoshilabs/slips/blob/master/slip-0044.md
    해당파일에서 index번호를 찾으면 됨. ex에 설명한 것 처럼 60은 이더리움, 0은 비트코인이고 1은 테스트넷(모든 코인의)

    =============== 소스 ===============

    const mnemonic = bip39.generateMnemonic();
    bip39를 이용해 mnemonic을 생성한다.

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    생성된 니모닉 단어들을 bip39를 이용해 버퍼 타입의 데이터로 변환


    이후 필요한 서버의 prefix에 따라 접속.
    const tbsys = { // bsys의 testnet prefix
        messagePrefix: '\x15Bsys Signed Message:\n',
        bip32: {
            public: 0x043587cf,
            private: 0x04358394
        },
        pubKeyHash: 0x6e,
        scriptHash: 0x80,
        wif: 0xEF
    }
    pubkey hash의 hexadecimal이고 address 의 prefix를 결정한다
    tbsys의 경우 puhkeyhash가 6e이므로 110이 되고, 110의 leading symbol은 m 이므로
    tbsys의 주소는 모두 m으로 시작한다.
    *참조 : https://en.bitcoin.it/wiki/List_of_address_prefixes#cite_note-1


    const bitcoinNetwork = tbsys.networks;
    const hdMaster = bitcoin.bip32.fromSeed(seed, bitcoinNetwork);
    비트코인 네트워크 변수를 위와 같이 선언하고 bip32를 통해 시드를 hdwallet으로 변환

    *비트코인 testnet의 경우 JSON.stringify(bitcoin.networks).testnet
    *비트코인 메인의 경우 bitcoin.networks.bitcoin

    {
        "__D":{
            "type":"Buffer",
            "data":[
                ...
            ]
        },
        "chainCode":{
            "type":"Buffer",
            "data":[
                ...
            ]
        },
        "network":{
            "wif":128,
            "bip32":{
                "public":76067358,
                "private":76066276
            }
        },
        "__DEPTH":0,
        "__INDEX":0,
        "__PARENT_FINGERPRINT":0
    }
    만들어진 HDwallet의 경우 master이므로 depth는 0이 된다.

    const key1 = hdMaster.derivePath("m/44'/1'/0'/0/0");
    const key2 = hdMaster.derivePath("m/44'/1'/0'/0/1");
    이후에 bip44를 통해 master 주소로 부터 child 를 생성.(규칙은 bip44트리레벨 구조 참조)
    
    {
        "__D":{
            "type":"Buffer",
            "data":[
                ...
            ]
        },
        "chainCode":{
            "type":"Buffer",
            "data":[
                ...
            ]
        },
        "network":{
            "wif":128,
            "bip32":{
                "public":76067358,
                "private":76066276
            }
        },
        "__DEPTH":5,
        "__INDEX":0,
        "__PARENT_FINGERPRINT":2666532778
    }
    생성된 child의 경우 depth를 지니고 parent(master)에 대한 fingerprint를 지님

    const key1Addr = getAddress(key1, tbsys);
    const key2Addr = getAddress(key2, tbsys);
    child를 통해 address를 생성

    key1Addr:   mXTnH3EbtVx8YT8qSvhmDW7SCSk8kHhGWF
    key1Addr:   mVVamVY3H2MpQAwEzRr5MSdaztGZe5oYVA


    */


/* 
1. 데이터베이스를 이용해야하는지
2. 데이터베이스를 이용하면 유저 로그인용 비밀번호를 db에 저장하는지
3. 데이터베이스에 tx리스트와 블록, utxo 등을 저장해야하는지
4. bsys테스트넷과 rpc통신시 bitcoin-core를 이용하는지
5. bsys config파일을 이용해서 비밀번호 아이디를 써야하는지
6. utxo로 트랜잭션 생성시 알고리즘
    
*/



























// .catch((err) => {
//     console.log('db.find error at /wire: ' + err);
// })
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




























// app.post('/update', (req, res) => {
//     db.find('mnemonic').then((result) => {
//         let status = "";
//         const mnemonic = result;
//         const auth = {
//             auth: true
//         };
//         db.updateOne('mnemonic', mnemonic, auth);
//         res.json('wallet');
//     });
// });




// console.log(Mnemonic.words);

// const Wallet = new wallet(Mnemonic.words); // 새 지갑 생성
// const AddressOne = Wallet.generate("m/44'/1'/0'/0/0"); // 새 지갑의 첫번째 새 주소 생성
// const AddressTwo = Wallet.generate("m/44'/1'/0'/0/1"); // 새 지갑의 두번째 새 주소 생성

// const mnemonicArr = Mnemonic.words.split(' ');

// res.sendFile(__dirname + '/src/index.js', (err) => {
// res.sendFile(__dirname + '/views/index.html', (err) => {
//     if (err)
//         next(err);
//     else
//         console.log('Sent success ', );


//     mnemonic = result.data.split(' ');
//     res.writeHead("200", {
//         "Content-Type": "text/html;charset=utf8"
//     });
//     res.write('<script type="text/javascript" src="./src/index.js"></script>');
//     res.write('빈칸에 적어둔 단어를 입력하고 제출을 누르세요<br>');

//     // const rng = getRandomArbitrary(0, mnemonic.length);
//     for (let i = 0; i < mnemonic.length; i++) {
//         // if (i == mnemonic.length - 1) {
//         if (i == mnemonicQuizIdx) {
//             res.write('<form action="/check_words" />');
//             res.write('<input type="text" placeholder="송금액" name="transfer_balance"  />');
//             res.write('<input type="submit" id="gen_words" value="제출" />');
//             res.write('</form><br>');
//         } else
//             res.write(`\n${i+1}: ${mnemonic[i]}<br>`);
//     }

//     // res.write(`\n${i+1}: ${mnemonic[i]}<br>`);
//     // res.write('<br>wallet: ' + JSON.stringify(Wallet));
//     // res.write('<br>wallet.getAddress(): ' + JSON.stringify(AddressOne));
//     // res.write('<br>wallet.getAddress(): ' + JSON.stringify(AddressTwo));
//     // res.write('<br>txb: ' + txb);

//     // res.write('<input type="text" placeholder="송금액" id="val" class="emp_txt" value="" />');
//     // res.write('<input type="text" placeholder="지갑주소" id="addr" class="emp_id_numcheck_box" value="" />');
//     // res.write('<input type="button" id="transfer_value" class="transfer" value="송금" />');
//     // res.write('<input type="text" placeholder="잔액" id="current_balance" class="emp_txt" value="" />');

//     res.end();


// app.get('/index', (req, res) => {
//     console.log('GET /');

//     const tbsys = {
//         messagePrefix: '\x15Bsys Signed Message:\n',
//         bip32: {
//             public: 0x043587cf,
//             private: 0x04358394
//         },
//         pubKeyHash: 0x6e,
//         scriptHash: 0x80,
//         wif: 0xEF
//     }

//     const tbsysClient = client;


//     let params = getParams();
//     console.log(params);

//     // client.getBlockHash(10).then((blockInfo) => {
//     //     console.log(blockInfo);
//     // }).catch((err) => {
//     //     // log(`Error getBlock at blockresult/getblock - RPC 'bitcoin-core'`, `Error`, err);
//     //     console.log('Err while getting blockInfo: ' + err);
//     //     // });
//     // });



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


// res.writeHead(200);
// res.end(writeData)

// res.writeHead("200", {
//     "Content-Type": "text/html;charset=utf8"
// });
// res.write('<br><br><a href="/signin">다음</a>');
// res.write('<br>utxo: ' + utxo);
// res.write('<br>key1Addr: ' + key1Addr);
// res.write('<br>key2Addr: ' + key2Addr);
// res.write('<br>txb: ' + txb);
// res.write('<input type="text" placeholder="송금액" id="val" class="emp_txt" value="" />');
// res.write('<input type="text" placeholder="지갑주소" id="addr" class="emp_id_numcheck_box" value="" />');
// res.write('<input type="button" id="transfer_value" class="transfer" value="송금" ㄴ/>');
// res.write('<input type="text" placeholder="잔액" id="current_balance" class="emp_txt" value="" />');
// // res.send(/src/index.js');
// res.end();


// res.render('/', {
//     mnemonic: mnemonic,
//     key1Addr: key1Addr,
//     key2Addr: key2Addr,
//     utxo: utxo,
//     seed: seed,
//     txb: txb,
// })

// res.end(mnemonic + '\n' + key1Addr);

// res.end(JSON.stringify({
//     mnemonic: mnemonic,
//     address: key1Addr
// }));
// res.send({
//     mnemonic: mnemonic,
//     // seed: seed,
//     // root: root,
//     // string: string,
//     // restored: restored,
//     // firstChild: child1,
//     // secondChild: child1b,
//     // firstChildString: child1String,
//     // firstChildRestored: child1String,
//     // secondChildString: child1bString,
//     // secondChildRestored: child1bString,