let res = "";

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
            inputHTML(result);
            getQRcode(result.address);
            createTx(result.address);
            // document.getElementById('list_mnemonic').innerHTML = showMnemonicCheckList(result);
        },
        error: function(err) {
            console.log('ajax create wallet Err: ' + JSON.stringify(err));
        },
    });

    const createTx = (addr) => {
        $.ajax({
            type: 'post',
            data: {
                addr: addr
            },
            dataType: "json",
            url: '/wire',
            success: function(result) {
                console.log('create tx at wallet js result');
                console.log(result);
            },
            error: function(err) {
                console.log('ajax create tx Err: ' + JSON.stringify(err));
            },
        });
    };

    const inputHTML = (walletInfo) => {
        let text = "";
        text +=
            '<p>* Wallet</p>' +
            '<p>Wallet Address: ' + walletInfo.address + '</p>' +
            '<p>keyWIF: ' + walletInfo.keyWIF + '</p><br>' +
            '<p>* Network\npubkeyHash: ' + walletInfo.key.network.pubKeyHash + '</p>' +
            '<p>scriptHash: ' + walletInfo.key.network.scriptHash + '</p><br>';
        document.getElementById('input_html').innerHTML = text;

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
});