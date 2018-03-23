var express = require("express");
var router = express.Router();
var mongodb = require("../database/db");


router.get("/getdata", (req, res, next) => {
  var resultArray = [];
  var err = "Not connected to Database";
  try {
    mongodb.database((err) => {
      console.log("Connection openned");
      if (err)
        res.json({ message: err });
      else {
        var collection = mongodb.getData();
        collection
          .find()
          .toArray((err, doc) => {
            console.log("toArray");
            if (doc[0] != null) {
              console.log("no error")
              res.json({
                resultArray: doc
              });

            }
            else {
              console.log("error")
              res.json({
                message: "No data available"
              });
            }
            mongodb.close();
          });
      }
    });
  }
  catch (exception) {
    res.json({ message: "Connectivity Error" });
  }
});

module.exports = router;
