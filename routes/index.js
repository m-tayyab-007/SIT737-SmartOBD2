const express = require("express");
const passport = require("passport");
require("../config/passport")(passport);
const router = express.Router();
const log4js = require("log4js");
const logger = log4js.getLogger("SmartOBD-ibmcloud");
const WebAppStrategy = require("ibmcloud-appid").WebAppStrategy;
// const SelfServiceManager = require("ibmcloud-appid").SelfServiceManager;
const userProfileManager = require("ibmcloud-appid").UserProfileManager;
const CALLBACK_URL = "/ibm/cloud/appid/callback";
let usedDongle;
// let uuid;
userProfileManager.init({
  oauthServerUrl:
    "https://au-syd.appid.cloud.ibm.com/oauth/v4/0371dfb0-43b0-4e63-8e5a-654cd51031ff",
  profilesUrl: "https://au-syd.appid.cloud.ibm.com",
});
// let selfServiceManager = new SelfServiceManager({
//   // iamApiKey: "jUC5e5nu9jQJn0wbyvymjN9pItaH1WOT0MuIqtIScfRQ",
//   iamApiKey: "jUC5e5nu9jQJn0wbyvymjN9pItaH1WOT0MuIqtIScfRQ",
//   managementUrl:
//     "https://au-syd.appid.cloud.ibm.com/management/v4/0371dfb0-43b0-4e63-8e5a-654cd51031ff",
// });
let ibmdb = require("../dbConnect").cloudant;
let dbName;
let accessToken;
// let userCode;
router.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));
router.use(passport.authenticate(WebAppStrategy.STRATEGY_NAME));
//homepage
router.get("/", (req, res) => {
  // collect current session used for the following pages
  // req.session.user = req.user;
  accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;
  console.log(req.user);
  console.log(req.user.attributes);
  ibmdb.getAllDbs().then((response) => {
    usedDongle = response.result;
    console.log("getDB");
    console.log(usedDongle);
  });
  userProfileManager.getAllAttributes(accessToken).then(function (attributes) {
    console.log(attributes.code);
    if (attributes.code) {
      console.log(req.user);
      req.session.code = attributes.code;
      req.session.car = attributes.car;
      req.session.car_health = _toObject(attributes.car_health);
      req.session.url = attributes.url;
      res.render("homepage", {
        user: req.user,
        car: req.session.car,
        car_health: req.session.car_health,
      }
      );
    } else {
      res.render("updateDetails");
    }
  });
});
//login
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/homepage",
//     failureRedirect: "/",
//     failureFlash: true,
//   })(req, res, next);
// });
//register page
// router.get("/updateDetails", (req, res) => {
//   res.render("updateDetails");
// });
router.post(
  "/updateDetails",
  passport.authenticate(WebAppStrategy.STRATEGY_NAME),
  (req, res, next) => {
    if (usedDongle.includes(req.body.code)) {
      console.log("OBD dongle code has been used");
      res.render("updateDetails", {
        error_msg: "OBD dongle code has been used",
      });
    } else {
      dbName = req.body.code;
      _generateCodeDB(dbName);
      _updateAttributes(req.body).then(function () {
        console.log("success");
        res.redirect("/");
      });
      req, res, next;
    }
  }
);
// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/");
});
//healthCheck
router.get("/healthReport", (req, res) => {
  res.render("healthReport", {
    user: req.user,
    car: req.session.car,
    car_health: req.session.car_health,
  });
});
// tripAnalysis
router.get("/tripAnalysis", (req, res) => {
  res.render("tripAnalysis", {
    user: req.user,
    car: req.session.car,
    car_health: req.session.car_health,
  });
});
// driving monitor
router.get("/monitor", (req, res) => {
  res.render("monitor", {
    user: req.user,
    car: req.session.car,
    url: req.session.url,
    car_health: req.session.car_health,
  });
});
router.get("/api/data", (req, res) => {
  if (req.session.code) {
    let userSensor = req.session.code;
    let currentData = [];
    ibmdb
      .postAllDocs({
        db: userSensor,
        includeDocs: true,
      })
      .then((response) => {
        // console.log(response.result.rows);
        for (i = 0; i < response.result.total_rows; i++) {
          // if (result[i].code == userSensor)
          if (response.result.rows[i].doc.dongle == userSensor) {
            currentData.push(response.result.rows[i].doc);
          }
        }
        res.send(currentData);
      });
  }
});
function RandomData(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function healthCheck(code) {
  switch (code) {
    case "obd001":
      var iginition = RandomData(80, 100),
        electric = RandomData(63, 100),
        coolant = RandomData(40, 100),
        lubrication = RandomData(68, 100),
        exhaust = RandomData(65, 100),
        fuel = RandomData(79, 100),
        overall = Math.round(
          (iginition + electric + coolant + lubrication + exhaust + fuel) / 6
        );
      break;
    case "obd002":
      var iginition = RandomData(80, 100),
        electric = RandomData(63, 100),
        coolant = RandomData(40, 100),
        lubrication = RandomData(68, 100),
        exhaust = RandomData(65, 100),
        fuel = RandomData(79, 100),
        overall = Math.round(
          (iginition + electric + coolant + lubrication + exhaust + fuel) / 6
        );
      break;
    case "obd003":
      var iginition = RandomData(80, 100),
        electric = RandomData(63, 100),
        coolant = RandomData(40, 100),
        lubrication = RandomData(68, 100),
        exhaust = RandomData(65, 100),
        fuel = RandomData(79, 100),
        overall = Math.round(
          (iginition + electric + coolant + lubrication + exhaust + fuel) / 6
        );
      break;
  }
  return {
    iginition: iginition,
    electric: electric,
    coolant: coolant,
    lubrication: lubrication,
    exhaust: exhaust,
    fuel: fuel,
    overall: overall,
  };
}
//get the node-red url that simulates the OBD dongle
function urlCheck(code) {
  switch (code) {
    case "obd001":
      var url = "https://node-red-dongle1-2022-05-31.au-syd.mybluemix.net/ui";
      break;
    case "obd002":
      var url = "https://node-red-dongle2-2022-05-31.au-syd.mybluemix.net/ui";
      break;
    case "obd003":
      var url = "https://node-red-dongle3-2022-05-31.au-syd.mybluemix.net/ui";
      break;
  }
  return url;
}
function _toString(object) {
  return JSON.stringify(object);
}
function _toObject(string) {
  return JSON.parse(string);
}
function _updateAttributes(body) {
  let car_object = [
    body.brand,
    body.model,
    body.year,
    body.series,
    body.engine,
  ];
  let car = _toString(car_object);
  let car_health = _toString(healthCheck(body.code));
  let url = urlCheck(body.code);
  userProfileManager
    .setAttribute(accessToken, "code", body.code)
    .then(function () {
      userProfileManager
        .setAttribute(accessToken, "car", car)
        .then(function () {
          userProfileManager
            .setAttribute(accessToken, "car_health", car_health)
            .then(function () {
              userProfileManager.setAttribute(accessToken, "url", url);
            });
        });
    });
  return new Promise((resolve) => {
    resolve();
  });
}
function _generateCodeDB(dbName) {
  ibmdb
    .putDatabase({
      db: dbName,
      partitioned: false,
    })
    .then((response) => {
      console.log(response.result);
    });
  return new Promise((resolve) => {
    resolve();
  });
}
exports.router = router;
