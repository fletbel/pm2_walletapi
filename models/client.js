const Client = require('bitcoin-core');
const bitcoin = require('bitcoinjs-lib');

const tbsys = {
    messagePrefix: '\x15Bsys Signed Message:\n',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394
    },
    pubKeyHash: 0x6e,
    scriptHash: 0x80,
    wif: 0xEF
}

const client = new Client({
    network: tbsys.network,
    host: 'testnet.bsysexplorer.com',
    port: 28293,
    username: 'user',
    password: '',
});


module.exports = {
    client: client,
    tbsys: tbsys
};