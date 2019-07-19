let initMnemonicList = "";
let getMnemonicList = "";

let showMnemonicList = (mnemonicList) => {};

function chkWord() {
    console.log('chk word function');
    const inputWord = document.getElementById('input_word').value;
    $.ajax({
        type: 'post', //요청 방식
        url: '/check_words',
        data: {
            word: inputWord
        },
        dataType: 'json',
        success: function(result) {
            console.log('result' + JSON.stringify(result));
            if (result.status == 'success') {
                alert('success');
            } else {
                alert('failed');
            }

            // initMnemonicList = result;
            // document.getElementById('list_mnemonic').innerHTML = showMnemonicList(result);
        },
        error: function(err) {
            // let result = JSON.parse(JSON.stringify(err));
            // console.log('result');
            // console.log(result);
            console.log('ajax chkWord Err: ' + JSON.stringify(err));
            // console.log('typeof(err): ' + typeof(err));
            // $("html").html(JSON.stringify(err));
            // $("html").html(result.responseText);
            // $("html").html(err.responseText);
        },
    });
}

$(document).ready(function() {

    function initMnemonic() {
        $.ajax({
            type: 'post', //요청 방식
            url: '/init_mnemonic',
            success: function(result) {
                initMnemonicList = result;
                console.log('ajax init mnemonic Done');
                console.log(result);
                document.getElementById('list_mnemonic').innerHTML = showMnemonicList(result);
            },
            error: function(err) {
                console.log('ajax initMnemonic Err: ' + JSON.stringify(err));
            },
        });
    }

    function getMnemonic() {
        $.ajax({
            type: 'post', //요청 방식
            url: '/get_mnemonic',
            success: function(result) {
                getMnemonicList = result;
                console.log('ajax get mnemonic Done');
                console.log(result);
                document.getElementById('list_mnemonic').innerHTML = showMnemonicCheckList(result);
            },
            error: function(err) {
                console.log('ajax getMnemonic Err: ' + JSON.stringify(err));
            },
        });
    }

    function chkMnemonic() {
        $.ajax({
            type: 'post', //요청 방식
            data: {
                word: chkWord,
                idx: idx
            },
            dataType: "json",
            url: '/check_word',
            success: function(result) {
                getMnemonicList = result;
                console.log('ajax get mnemonic Done');
                console.log(result);
                document.getElementById('list_mnemonic').innerHTML = showMnemonicCheckList(result);
            },
            error: function(err) {
                console.log('ajax getMnemonic Err: ' + JSON.stringify(err));
            },
        });
    }

    let showMnemonicList = (mnemonicList) => {
        let mnemonicArr = mnemonicList.split(' ');
        let showList = "";

        for (let i = 0; i < mnemonicArr.length; i++)
            showList += `<br>${i+1}: ${mnemonicArr[i]}`;
        return showList;
    };

    const showMnemonicCheckList = (mnemonicList) => {
        let mnemonicArr = mnemonicList.split(' ');
        let showList = "";
        const rng = Math.round((Math.random(1, mnemonicArr.length) * 10 + 1) % mnemonicArr.length);
        console.log('mnemonicList length: ' + mnemonicList.length);
        for (let i = 0; i < mnemonicArr.length; i++) {
            if (i == rng)
                showList += '<form method="POST" action="wallet">' +
                '<input type="text" placeholder="입력하세요" name="input_word"  />' +
                // '<input type="submit" value="제출" onclick="chkWord();"/></form><br>';
                '<input type="submit" value="제출"/></form><br>';
            else
                showList += `${i+1}: ${mnemonicArr[i]}<br>`;
        }
        return showList;
    };

    $('#chk_words').on('click', function() {});

    $('#gen_words').on('click', function() {
        initMnemonic();
    });

    initMnemonic();

    $('#next').on('click', function() {
        document.getElementById('gen_words').style.display = "none"
        document.getElementById('next').style.display = "none"
        getMnemonic();
    });
});