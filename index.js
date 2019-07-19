var pm2 = require('pm2');
let processList;

/**
 * @author wally
 * 메인프로세스 종료시(혹은 재시작시) 하위 프로세스 종료 후 메인 프로세스 종료
 */
process.on('SIGINT', async function() {
    for (let i = 0; i < processList.length; i++) {
        await stopChildProcess(processList[i].pm2_env.pm_id);
    }
    console.log('Try to kill main process');
    process.exit(0);
});

/**
 * @author wally
 * 하위 프로세스 생성
 */
pm2.connect(function(err) {
    if (err) {
        console.log(err);
        process.exit(2);
    }

    pm2.start([
        //     {
        //     name : 'child-1',
        //     script: 'child.js',
        //     merge_logs : true,
        //     log_date_format : "YYYY-MM-DD HH:mm",
        //     watch: 'false'
        // }
        // ,{
        //     name : 'child-2',
        //     script: '2ndChild.js',
        //     merge_logs : true,
        //     log_date_format : "YYYY-MM-DD HH:mm",
        //     watch: 'false'
        // },
        {
            name: 'web',
            script: 'web.js',
            merge_logs: true,
            log_date_format: "YYYY-MM-DD HH:mm",
            watch: 'false',
            port: 8123,
            exec_mode: 'cluster',
            instances: 2
        }
    ], function(err, apps) {
        if (err)
            throw err;
        processList = apps;

        console.log('[Master] create process!');
    });
});

/**
 * @author wally
 * pm2에서 프로세스통신을 사용하기 위해 Bus 생성 및 메세지 전달
 */
pm2.launchBus(function(err, bus) {
    bus.on('process:msg', function(packet) {
        for (let i = 0; i < processList.length; i++) {
            if (packet.data.target === processList[i].pm2_env.name)
                sendMessage(processList[i].pm2_env.pm_id, {
                    type: 'process:msg',
                    data: packet.data,
                    topic: 'my topic'
                });
        }
    });
});

/**
 * @param {*} pid 메세지를 받을 프로세스ID
 * @param {*} message 메세지
 * message는 아래의 형식{type, data, topic}을 지켜야한다.
 *  type: 'process:msg',
    data: {
        target : 'child-2',
        text : 'send message template'
    },
    topic: 'my topic'
 */
function sendMessage(pid, message) {
    pm2.sendDataToProcessId(pid, message, function(err, res) {
        if (err)
            throw err;
    });
}

/**
 * @param {*} pid 종료할 프로세스ID
 * 하위 프로세스가 모두 종료된 이후
 * 메인 프로세스 종료를 위해 async/await 방식 사용
 */
function stopChildProcess(pid) {
    return new Promise(function(resolve, reject) {
        pm2.delete(pid, function(err, res) {
            if (err)
                console.log(err);
            resolve();
        });
    });
}

/**
 * 포르그램 시작 5초 뒤 특정 하위 프로세스에게 메세지 보내는 예시
 */
setTimeout(function() {
    sendMessage(processList[0].pm2_env.pm_id, {
        type: 'process:msg',
        data: {
            target: 'child-1',
            text: 'hi'
        },
        topic: 'my topic'
    });
}, 5000);