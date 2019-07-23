const client = require('../models/client');

module.exports = function(url) {
    return new Promise(resolve => {
        request('https://' + client.client.host + url, function(error, response, body) {
            if (error)
                console.error(error);
            resolve(body);
        });
    });
}