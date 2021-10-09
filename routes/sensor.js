const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const indexRouter = require("./index").router;
const db = require("../dbConnect").dbConnect;
// let userDongle = userSession.code;
let dataCollection;
setTimeout(() => {
  dataCollection = db.client.db().collection("simulate");
}, 500);

//Import user session
indexRouter.get("/homepage", ensureAuthenticated, (req, res) => {
  // collect current session used for the following pages
  req.session.user = req.user;
  // userInform = req.user;
});
// Use OBD code in the session to get data of current user
router.get("/", ensureAuthenticated, (req, res) => {
  let userSensor = req.session.user.code;
  // console.log(userSensor);
  let currentData = [];
  dataCollection.find().toArray(function (err, result) {
    if (err) throw err;
    for (i = 0; i < result.length; i++) {
      // if (result[i].code == userSensor) 
      if(result[i].dongle == userSensor){
        currentData.push(result[i]);
      }
    }
    // console.log(currentData);
    res.send(currentData);
  });
});
exports.router = router;