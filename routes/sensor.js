const express = require("express");
const router = express.Router();
const routerIndex = require("../routes/index").router;
let db = require("../dbConnect");
let dataCollection;
setTimeout(() => {
  dataCollection = db.dbConnect.client.db().collection("simulate");
}, 500);

router.get("/", (req, res) => {
  dataCollection.find().toArray(function (err, result) {
    if (err) throw err;
    // console.log(1);
    res.send(result);
  });
});
exports.router = router;
