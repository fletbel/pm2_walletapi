const request = require('request');
const client = require('../models/client');
// const http = require('http');
// var sa = require('superagent');
module.exports = {
    request: function(url) {
        return new Promise(resolve => {
            request('https://' + client.client.host + url, function(error, response, body) {
                if (error)
                    console.error(error);
                resolve(body);
            });
        });
    },
    sendTx: function(address, tx) {
        return new Promise(resolve => {
            const uri = 'https://' + client.client.host + '/new/sendtx/';

            console.log('\n http request parameters: ');
            console.log('\n address: ' + address);
            console.log('\n tx: ' + tx);
            console.log('\n uri: ' + uri);

            const data = {
                addr: address,
                hex: tx,
            };
            const httpURI = 'https://testnet.bsysexplorer.com';
            const options = {
                // uri: uri,
                url: 'https://testnet.bsysexplorer.com/new/sendtx',
                hostname: 'testnet.bsysexplorer.com',
                path: '/new/sendtx/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data,
                json: true
            };

            const a = request(options, function(error, response, body) {
                if (error) {
                    console.log('\n Request post error: ' + error);
                    throw error;
                }

                console.log('\n headers: ');
                console.log(response.headers);
                console.log('\n statusCode: ');
                console.log(response.statusCode);

                console.log('\n options: ');
                console.log(options);
                resolve(body);
            });


            // var body = JSON.stringify({
            //     foo: "bar"
            // })

            // var request = new http.ClientRequest({
            //     hostname: "SERVER_NAME",
            //     port: 80,
            //     path: "/get_stuff",
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Content-Length": Buffer.byteLength(body)
            //     }
            // })

            // request.end(body);


            // request
            //     .post(url)
            //     .send({
            //         addr: address,
            //         hex: tx,
            //     })
            //     .set('Accept', 'application/json')
            //     .then(res => {
            //         console.log('\npost res: ' + res);
            //     });
            // sa.post(url)
            //     .send({
            //         addr: address,
            //         hex: tx,
            //     })
            //     .end(function(err, res) {
            //         console.log('\npost res: ' + res);
            //         //TODO
            //     });
            console.log('\n options: ' + JSON.stringify(options));

            // const post_req = http.request(post_options, function(res) {
            //     res.setEncoding('utf8');
            //     res.on('data', function(chunk) {
            //         console.log('Response: ' + chunk);
            //     });
            // });

            // // post the data
            // post_req.write(data);
            // post_req.end();

            // let xhr = new XMLHttpRequest();
            // // let url = url;
            // xhr.open("POST", url, true);
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.onreadystatechange = function() {
            //     if (xhr.readyState === 4 && xhr.status === 200) {
            //         let json = JSON.parse(xhr.responseText);
            //         console.log(json.email + ", " + json.password);
            //     }
            // };
            // // let data = JSON.stringify({ "email": "hey@mail.com", "password": "101010" });
            // xhr.send(options.body);

        });
    },
}


// hostname: 'https://' + client.client.host,
// hostname: url,
// headers: { 'Content-Type': 'application/json' },
// url: '/new/sendtx',
// url: url,

/*
    전송 성공시
    POST /new/sendtx HTTP/1.1
    Host: testnet.bsysexplorer.com
    Content-Type: application/json
    User-Agent: PostmanRuntime/7.15.2
    Accept: *\/*
    Cache-Control: no-cache
    Postman-Token: 1edb11c0-09a1-45f2-b672-b5634aebbffd,5579c188-416f-4b3c-8c07-13830d706955
    Host: testnet.bsysexplorer.com
    Cookie: __cfduid=d319007f12731bf42bf238c7a949d3ca41563932617
    Accept-Encoding: gzip, deflate
    Content-Length: 513
    Connection: keep-alive
    cache-control: no-cache
    {
    "addr" : "mQxr864raNvYi6mGQhfqTHZLpuaJFcSP1X",
    "hex" : "0200000001ffff9968418ce05e08bf96a9520ce46bf7500af837f83cc38a725599a27dcb72010000006a473044022009e3f0c10407455f8a333366df72b4d3ae525b280563944cd20a0334377072e402203b755b3c65d715308c00a83703f530bc1112150120211f58576eb728a354758e012103d38f0b4adb628a7cc64379034d046ea45348844f804b3f404de86b6af31e6e6fffffffff02008c8647000000001976a914d7b096cad9d2f0d4e7e04e517c6574a88588bdfa88ac302dfa02000000001976a914605bc6b99db3ac9c9b53b586cc500514c192e17f88ac00000000"
    }
*/
// var http = require('http');
// var url = require('url');
// var fs = require('fs');
// var querystring = require('querystring');

// http.createServer(function(req, res) {
//     if (req.method == 'GET') {
//         fs.readFile('./docRoot/form.html', function(err, data) {
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(data);
//         });
//     } else if (req.method == 'POST') {
//         req.on('data', function(chunk) {
//             console.log(chunk.toString());
//             var data = querystring.parse(chunk.toString());
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end('id : ' + data.id + 'pwd : ' + data.pwd);
//         });
//     }
// }).listen(8888, function() {
//     console.log('server running on 8888.');
// });



// let getData = (url) => {
// module.exports = function(url) {
// const options = {
//     //     hostname: client.client.host,
//     //     path: url,
//     //     // port: client.client.port,
//     //     // port: 8080,
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     }
//     // };
// console.log(client.client.host + '/:443' + url);
// https.get('https://' + client.client.host + '/:443' + url, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });

// }).on('error', (e) => {
//     console.error(e);
// });
//     return new Promise(resolve => {
//         request('https://' + client.client.host + url, function(error, response, body) {
//             if (error)
//                 console.error(error);
//             resolve(body);
//             // console.log('\nresponse: ');
//             // console.log(response);
//             // console.log('\nbody: ');
//             // console.log(body);
//         });
//     });
// }
// request.post('https://' + client.client.host + url, "", (error, res, body) => {
//     if (error) {
//         console.error(error)
//         return
//     }
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(body)
// })




// const options = {
//     host: 'testnet.bsysexplorer.com',
//     // port: 443,
//     path: '/new/getutxos/mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf',
//     method: 'POST',
//     headers: {
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         'Content-Type': 'application/json; charset=utf-8',
//     }
// };
// // {
// //     "hostname": "testnet.bsysexplorer.com",
// //     "path": "/new/getutxos/mQzZ4HAqk9zWBeYbwd9GshD5z2gQJqYnDf",
// //     "method": "POST",
// //     "headers": {
// //         "Content-Type": "application/json"
// //     }
// // }
// console.log('\noptions: ' + JSON.stringify(options))
//     // const options = {
//     //     hostname: client.client.host,
//     //     path: url,
//     //     // port: client.client.port,
//     //     // port: 8080,
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     }
//     // };
//     // https.get('http')
// const req = https.request(options, (res) => {
//     // console.log('res');
//     // console.log(res);
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//         console.log(d);
//         process.stdout.write(d);

//     });
// });

// req.on('error', (e) => {
//     console.error(e);
// });
// req.end();


// const end = () => {
//     req.end();
// }
// const options = {
//     hostname: client.client.host,
//     path: url,
//     // port: client.client.port,
//     // port: 8080,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };
// // ; charset=utf-8',
// // console.log('options');
// // console.log(options);
// // console.log('client.Client');
// // console.log(client.client.host);

// const req = http.request(options, function(res) {
//     // console.log(res.soc.parserket.parser.incoming);
//     console.log('Status: ' + res.statusCode);
//     console.log('Headers: ' + JSON.stringify(res.headers));
//     res.setEncoding('utf8');
//     res.on('data', function(body) {
//         console.log('Body: ' + body);

//     });
//     return res;

// });

// req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
// });

// req.write(
//     '{"text": "test string"}'
// );
// req.end();
//====================================================


// function readJSONResponse(response) {
//     let responseData = "";
//     response.on('data', function(chunk) {
//         responseData += chunk;
//     });
//     response.on('end', function() {
//         const dataObj = JSON.parse(responseData);
//         console.log("Raw Response: " + responseData);
//         console.log("Message: " + dataObj.message);
//         console.log("Question: " + dataObj.question);
//         return responseData;
//     });
// }

// const req = http.request(options, readJSONResponse);
// req.write('{"name":"Bilbo,", "occupation":"Burglar"}');









// {
//     hostname: client.client.host,
//     path: url,
//     // port: client.client.port,
//     // port: 8080,
//     method: 'POST',
//     headers: {
//         'Content-Type': 'text/html


//     }

// const dhttp = require('dhttp')

// // ...
// dhttp({
//     method: 'POST',
//     url: client.client.host
// }, function(err, res) {
//     // err is only provided if the connection failed in some way
//     // OR if the content body parsing failed in some way
//     if (err) return
//     if (res.statusCode !== 200) return
//     if (res.headers['content-type'] !== 'application/json') return

//     // if `content-type` was not supported, expect body to be `null`
//     console.log(res.body)
//         // => { foo: 'bar' }, a parsed JSON object

//     // ...
// })










// module.exports = getData;

// function getData(url) {
//     console.log(url);
//     console.log(client.port);
//     const req = http.get({
//         hostname: client.host,
//         port: client.port,
//         path: url
//     }, (res) => {
//         let resData = '';
//         res.on('data', (chunk) => {
//             resData += chunk;
//         });

//         res.on('end', () => {
//             return resData;
//         });
//     })

//     req.on('error', (err) => {
//         console.log('오류발생:' + err.message);
//     });
// }

// const getData = (url) => {
//     console.log(url);
//     console.log(client.port);
//     const req = http.post({
//         host: client.host,
//         port: client.port,
//         path: url
//     }, (res) => {
//         let resData = '';
//         res.on('data', (chunk) => {
//             resData += chunk;
//         });

//         res.on('end', () => {
//             return resData;
//         });
//     })

//     req.on('error', (err) => {
//         console.log('오류발생:' + err.message);
//     });
// }
//  = getData;













// const client = new Client({
//     network: tbsys.network,
//     host: 'http://testnet.bsysexplorer.com',
//     port: 28293,
//     username: 'user',
//     password: '',
// });

// var options = { host: 'www.google.com', port: '80', path: '/' };


// getData.prototype.options = {
//     host: client.host,
//     port: client.port,
//     path: url
// };zz












// const request = require('request');
// const client = require('../models/client');

// module.exports = {
//     request: function(url) {
//         return new Promise(resolve => {
//             request('https://' + client.client.host + url, function(error, response, body) {
//                 if (error)
//                     console.error(error);
//                 resolve(body);
//             });
//         });
//     },
//     sendTx: function(address, tx) {
//         return new Promise(resolve => {
//             console.log('\n http request parameters: ');
//             console.log('\n address: ' + address);
//             console.log('\n tx: ' + tx);

//             const url = 'https://' + client.client.host + '/new/sendtx';
//             const options = {
//                 headers: { 'Content-Type': 'application/json; charset=utf-8' },
//                 body: {
//                     addr: address,
//                     hex: tx,
//                 },
//                 url: url,
//                 json: true
//             }
//             request.post(options, function(error, response, body) {
//                 console.log('\n url: ' + 'https://' + client.client.host + '/new/sendtx');

//                 if (error)
//                     console.error('Request post error' + error);
//                 // console.log('\nresponse: ');
//                 // console.log(response);
//                 console.log('\nbody: ');
//                 console.log(body);
//                 console.log('\noptions: ');
//                 console.log(options);
//                 resolve(body);
//             });
//         });
//     },
// }z