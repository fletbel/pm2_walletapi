const bip39 = require('bip39');
// const db = require("../libs/database");

//bip39 모듈을 이용해 단어를 생성하고 문자열과 배열로 반환하는 함수
function mnemonicGenerator() {
    const words = bip39.generateMnemonic(); // bip 39로 단어 생성

    // 코인이 들어가 있는 지갑 주소
    // const words = "body lamp morning brass paddle copy deputy there course civil mammal yard";
    const wordsArr = words.split(' '); // 공백을 구분자로 단어를 배열에 저장
    return { // 나열된 단어를 하나의 문자열과 배열로 구분해 json으로 반환
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

// const bip39 = require('bip39');

// function Mnemonic() {}
// Mnemonic.prototype.words = bip39.generateMnemonic();
// Mnemonic.prototype.wordsArr = bip39.generateMnemonic().split(' ');

// module.exports = Mnemonic;