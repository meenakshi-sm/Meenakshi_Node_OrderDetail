var mongo = require("mongodb").MongoClient;
var config = require('../config/config.js');
let collection;
let dbs;
module.exports = {
    database: function (cb) {
        mongo.connect(config.db.url, (err, database) => {
            if (err) res.status(404).json({ error: err });
            else {
                dbs = database;
                let db = dbs.db("OrderDb");
                collection = db.collection("Order Details");
                return cb();
            }
        });
    },
    getData: function () {
        return collection;
    },
    close: function () {
        return dbs.close();
    }
}