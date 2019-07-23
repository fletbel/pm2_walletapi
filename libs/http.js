const request = require('request');
const client = require('../models/client');

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
            console.log('\nhttp sendtx data: ');
            console.log('\naddress: ' + address);
            console.log('\ntx: ' + tx);
            const addr = address;
            const hex = tx;
            const url = 'https://' + client.client.host + '/new/sendtx';

            const options = {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                json: {
                    addr: address,
                    hex: tx,
                },
                url: url,
                json: true
            }
            request.post(options, function(error, response, body) {
                console.log('\n url: ' + 'https://' + client.client.host + '/new/sendtx');

                if (error)
                    console.error(error);
                // console.log('\nresponse: ');
                // console.log(response);
                console.log('\nbody: ');
                console.log(body);
                console.log('\noptions: ');
                console.log(options);
                return body;
            });
        });
    },
}

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