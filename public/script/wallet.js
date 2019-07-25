$(document).ready(function() {
    //initialize page
    $.ajax({
        type: 'post', //요청 방식
        // url: '/create_address',
        url: '/create_wallet',
        success: function(result) {
            getMnemonicList = result;
            console.log('ajax create address Done');
            console.log(result);
            inputWalletHtml(result); // 지갑정보 출력
            getQRcode(result.address); // qrcode 출력
            // createTx(result.address);
            getUtxo(result.address); // utxo 가져오기
            getBalance(result.address); // 잔액 가져오기
            getTxHistory(result.address); // txhistory 가져오기
            // document.getElementById('list_mnemonic').innerHTML = showMnemonicCheckList(result);
        },
        error: function(err) {
            console.log('ajax create wallet Err: ' + JSON.stringify(err));
        },
    });

    // 서버의 url로 부터 txhistory를 가져와 페이지에 출력하는 함수
    const getTxHistory = (address) => {
        const getTxHistoryUrl = '/new/gettxlist/';
        requestData(address, getTxHistoryUrl).then((result) => {
            inputTxHistory(result.Contents); //가져온 데이터 페이지에 출력
        })
    }

    // 서버의 url로 부터 getBalance 가져와 페이지에 출력하는 함수
    const getBalance = (address) => {
        const getBalanceUrl = '/new/getbalance/';
        requestData(address, getBalanceUrl).then((result) => {
            inputBalance(result.Contents); //가져온 데이터 페이지에 출력
        })
    }

    // 서버의 url로 부터 getUtxo 가져와 페이지에 출력하는 함수
    const getUtxo = (address) => {
        const getUtxoURL = '/new/getutxos/';
        requestData(address, getUtxoURL).then((result) => {
            inputUtxoHtml(result.Contents); //가져온 데이터 페이지에 출력
        })
    }

    // 입력받은 tx list 로 부터 변수 text에 html텍스트를 담아 페이지에 출력하는 함수
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

    // 입력받은 balance 로 부터 변수 text에 html텍스트를 담아 페이지에 출력하는 함수
    const inputBalance = (balance) => {
        const satoshiLengthIdx = 8;
        let text =
            '<p>* Balance </p>' +
            '<p>Total balance: ' + Number(balance.totalBalance).toFixed(satoshiLengthIdx) + ' Unconfirmed: ' + balance.unconfirmed + '</p><br>';
        document.getElementById('html_balance').innerHTML = text;
    }

    // 입력받은 inputUtxoHtml 로 부터 변수 text에 html텍스트를 담아 페이지에 출력하는 함수
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

    // 입력받은 inputWalletHtml 로 부터 변수 text에 html텍스트를 담아 페이지에 출력하는 함수
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

    // 입력받은 주소, 서버url로 서버로부터 data를 받아 와 promise로 결과값을 resolve하는 함수
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

    // 입력받은 주소로 서버로부터 data를 받아 와 결과를 페이지에 넣는 함수
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

    // delete_wallet 버튼 클릭시 서버의 delete_wallet을 호출 해 지갑 삭제
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
    // html_wire 버튼 클릭시 서버의 wire 호출 해 웹 페이지의 input에 입력 한 주소와 양을 서버에 전송,
    // 서버로부터 전송된 결과를 출력
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
        else {
            console.log('Error: ' + res.code);
            alert('입력이 올바르지 않습니다.');
        }
    });

    //입력받은 주소와 잔액을 검사하는 함수. 특수문자 처리 추가 필요
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

    // input이 숫자일 시 true, 아니면 false를 반환하는 함수 isNumber
    function isNumber(s) {
        s += ''; // 문자열로 변환
        s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
        if (s == '' || isNaN(s)) return false;
        return true;
    }
    String.prototype.isNumber = function() { //string 에 한해서만 isNumber를 검사하는 프로토타입
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