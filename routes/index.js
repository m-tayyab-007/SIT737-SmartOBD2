const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");


const simulateSchema = {
  // fuel: Number,
  // temprature: Number,
  // speed: Number,
  // brake: Number,
  // time: Number,
  // distance: Number,
  from: String,
  // to: String,
  // url: String
};

const Simulate = mongoose.model('Simulate', simulateSchema);




//login page
router.get("/", (req, res) => {
  res.render("login");
});
//register page
router.get("/register", (req, res) => {
  res.render("register");
});
//homepage
router.get("/homepage", ensureAuthenticated, (req, res) => {
  // collect current session used for the following pages
  req.session.user = req.user;
  res.render("homepage", {
    user: req.user,
  });
});
//healthCheck
router.get("/healthReport", ensureAuthenticated, (req, res) => {
  res.render("healthReport", {
    user: req.session.user,
  });
});
//tripAnalysis
// router.get("/tripAnalysis", ensureAuthenticated, (req, res) => {
//   res.render("tripAnalysis", {
//     user: req.session.user,
//   });
// });

router.get('/tripAnalysis', ensureAuthenticated, (req, res) => {
  Simulate.find({}, function(err, simulates) {
    res.render('tripAnalysis', {
    simulateList: simulates[simulates.length-1],
    user: req.session.user
    })
  })
});
module.exports = router;
