let res = "";
let req = "";

$(document).ready(function() {
    $.ajax({
        type: 'post', //요청 방식
        // url: '/create_address',
        url: '/create_wallet',
        success: function(result) {
            getMnemonicList = result;
            console.log('ajax create address Done');
            res = result;
            console.log(result);
            inputWalletHtml(result);
            getQRcode(result.address);
            // createTx(result.address);
            getUtxo(result.address);
            getBalance(result.address);
            getTxHistory(result.address);
            // document.getElementById('list_mnemonic').innerHTML = showMnemonicCheckList(result);
        },
        error: function(err) {
            console.log('ajax create wallet Err: ' + JSON.stringify(err));
        },
    });

    const getTxHistory = (txList) => {
        const getTxHistoryUrl = '/new/gettxlist/';
        requestData(txList, getTxHistoryUrl).then((result) => {
            inputTxHistory(result.Contents);
        })
    }

    const getBalance = (address) => {
        const getBalanceUrl = '/new/getbalance/';
        requestData(address, getBalanceUrl).then((result) => {
            inputBalance(result.Contents);
        })
    }

    const getUtxo = (address) => {
        const getUtxoURL = '/new/getutxos/';
        requestData(address, getUtxoURL).then((result) => {
            inputUtxoHtml(result.Contents);
        })
    }

    const inputTxHistory = (txList) => {
        const satoshiMultiIdx = 100000000;
        const satoshiLengthIdx = 8;
        let text = '<p>* Tx History</p>';
        for (let i = 0; i < txList.length; i++)
            text +=
            '<p> txid: ' + txList[i].txid + '</p>' +
            '<p> timestamp: ' + timeStamp(txList[i].timestamp).fullTime + '</p>' +
            '<p> amount: ' + txList[i].amount.toFixed(satoshiLengthIdx) + ' BSYS (' + txList[i].amount * satoshiMultiIdx + ' satoshis)</p>' +
            '<p> sender: ' + txList[i].sender + '</p>' +
            '<p>----------------------------------------------------------------</p>';
        document.getElementById('html_txhistory').innerHTML = text;
    }

    const inputBalance = (balance) => {
        const satoshiLengthIdx = 8;
        let text =
            '<p>* Balance </p>' +
            '<p>Total balance: ' + Number(balance.totalBalance).toFixed(satoshiLengthIdx) + ' Unconfirmed: ' + balance.unconfirmed + '</p><br>';
        document.getElementById('html_balance').innerHTML = text;
    }

    const inputUtxoHtml = (utxo) => {
        const satoshiMultiIdx = 100000000;
        const satoshiLengthIdx = 8;
        let text = '<p>* UTXO</p>';
        for (let i = 0; i < utxo.length; i++)
            text +=
            '<p> txid: ' + utxo[i].txid + '</p>' +
            '<p> vout: ' + utxo[i].vout + '</p>' +
            '<p> balance: ' + (utxo[i].satoshis / satoshiMultiIdx).toFixed(satoshiLengthIdx) + ' BSYS (' + utxo[i].satoshis + ' satoshis)</p>' +
            '<p> availableAt: ' + timeStamp(utxo[i].availableAt).timelapse + '</p>' +
            '<p>----------------------------------------------------------------</p>';
        console.log('text');
        console.log(text);
        document.getElementById('html_utxo').innerHTML = text;
    }

    const inputWalletHtml = (walletInfo) => {
        console.log(walletInfo);
        let text = "";
        text +=
            '<p>* Wallet</p>' +
            '<p>Wallet Address: ' + walletInfo.address + '</p>' +
            '<p>keyWIF: ' + walletInfo.keyWIF + '</p><br>' +
            '<p>* Network\npubkeyHash: ' + walletInfo.key.network.pubKeyHash + '</p>' +
            '<p>scriptHash: ' + walletInfo.key.network.scriptHash + '</p><br>';
        document.getElementById('html_wallet_info').innerHTML = text;
    }

    const requestData = (address, url) => {
        return new Promise(resolve => {
            $.ajax({
                type: 'post', //요청 방식
                // url: '/create_address',
                data: {
                    data: address,
                    url: url + address
                },
                dataType: 'json',
                url: '/request_data',
                success: function(result) {
                    console.log('ajax requestData Done');
                    resolve(result);
                },
                error: function(err) {
                    console.log('ajax requestData Err: ' + JSON.stringify(err));
                },
            });
        });
    }

    function getQRcode(addr) {
        $.ajax({
            type: 'POST', //요청 방식
            data: { addr: addr },
            dataType: 'JSON',
            url: '/qr',
            success: function(result) {
                // console.log('qr result: ' + result);
                document.getElementById('qrcode').innerHTML = result;
            },
            error: function(err) {
                console.log('QR Err: ' + JSON.stringify(err));
            },
        });
    }
    // wire(result.address);

    $('#delete_wallet').on('click', () => {
        $.ajax({
            type: 'get', //요청 방식
            url: '/delete_wallet',
            success: function(result) {
                console.log('delete wallet done!');
            },
            error: function(err) {
                console.log('delete_wallet Err: ' + JSON.stringify(err));
            },
        });
    });
    // mZRU2bUvApJ1k2rcQY6BJBwMTgWki8HKmd
    $('#html_wire').on('click', () => {
        // const wire = () => {
        const addr = document.getElementById('html_input_address').value;
        const balance = document.getElementById('html_input_balance').value;
        const res = handleWord(addr, balance);
        console.log(`addr: ${addr}, balance: ${balance}`);
        if (res.status)
            $.ajax({
                type: 'post', //요청 방식
                url: '/wire',
                data: {
                    address: addr,
                    amount: balance
                },
                dataType: 'json',
                success: function(result) {
                    console.log('wire done!');
                    console.log(result);
                },
                error: function(err) {
                    console.log('delete Err: ' + JSON.stringify(err));
                },
            });
        else
            console.log('Error: ' + res.code);
    });

    const handleWord = (walletAddr, balance) => {
        if (!walletAddr || !balance)
            return {
                status: false,
                code: 'empty',
            };
        else if (!isNumber(balance))
            return {
                status: false,
                code: 'wrong args',
            };
        else
            return {
                status: true,
                code: 'wrong args',
            };
    }

    function isNumber(s) {
        s += ''; // 문자열로 변환
        s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
        if (s == '' || isNaN(s)) return false;
        return true;
    }
    String.prototype.isNumber = function() {
        return /^\d+$/.test(this);
    };
});


// const createTx = (addr) => {
//     $.ajax({
//         type: 'post',
//         data: {
//             addr: addr
//         },
//         dataType: "json",
//         url: '/wire',
//         success: function(result) {
//             console.log('create tx at wallet js result');
//             console.log(result);
//         },
//         error: function(err) {
//             console.log('ajax create tx Err: ' + JSON.stringify(err));
//         },
//     });
// };