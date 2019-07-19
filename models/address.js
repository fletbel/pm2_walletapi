const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const AddrSchema = new Schema({
    address: { type: String, unique: true },
    scriptPubKey: { type: String, default: "" },
    balance: { type: Number },
    mempool: [{ txid: String, vout: Number, satoshis: Number }],
    tx: { type: Array }
});

module.exports = mongoose.model('Address', AddrSchema);