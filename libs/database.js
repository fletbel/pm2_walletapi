// const mnemonic = require('../public/mnemonic');
const mongoose = require('mongoose');
// const settings = require('../settings');



const url = "mongodb://localhost:27017/mydb";


function exit() {
    mongoose.disconnect();
    process.exit(0); //정상 종료
}
// "mongodb://localhost:27017/walletapi"
module.exports = {
    connect: function(database, cb) {
        mongoose.connect(database, {
            useNewUrlParser: true
        });
        mongoose.connection.once("open", function() {
            console.log(`DB connected at ${url}`);
        });
        mongoose.connection.on("error", function(err) {
            if (err) {
                console.log('Unable to connect to Database: ' + err);
                // console.log('Unable to connect to database: %s', database);
                // console.log('Aborting');
                process.exit(1);
            }
            return cb();
        });
    },
    disconnect: () => {
        mongoose.disconnect();
        process.exit(0);
    },

    drop: (collection) => {
        return new Promise(resolve => {
            mongoose.connection.collection(collection).drop(function(err, delState) {
                if (err) throw err;
                if (delState) console.log("Collection deleted");
                resolve();
            });
        });
    },

    find: (collection) => {
        // mongoose.connection.collection(collection).findOne({ "data": "" }, (err, board) => {
        return new Promise(resolve => {
            mongoose.connection.collection(collection).findOne("", (err, result) => {
                if (err) {
                    log(`Err occured while seraching board by ID`, `Error`);
                    throw err;
                }
                // console.log('result');
                // console.log(result);
                resolve(result);
            });
        });
    },
    updateOne: (collection, dataFilter, data) => {
        return new Promise(resolve => {
            mongoose.connection.collection(collection).updateOne(dataFilter, { $push: data }), (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                resolve('success');
            };
        });
    },
    insertOne: (collection, string) => {
        mongoose.connection.collection(collection).insertOne([{ data: string }],
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            }
        );
    },

    insertMany: (collection, inputObj) => {
        console.log(`\ninsertMany collection:[${collection}] inputObj:[${inputObj}]`);
        mongoose.connection.collection(collection).insertMany([inputObj],
            (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            }
        );
    },

};


// const users = mongoose.connection.collection("users");

// mongoose.connection.collection("users").insertMany(
//     [{
//         id: id,
//         password: pw
//     }],
//     function(err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//     }
// )