const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
let db = require("../dbConnect").dbConnect;
let usersCollection;
setTimeout(() => {
  usersCollection = db.client.db().collection("users");
}, 500);
let dataCollection;
setTimeout(() => {
  dataCollection = db.client.db().collection("simulate");
}, 500);
let userEmail;
let userCode;
//login page
router.get("/", (req, res) => {
  res.render("login");
});
//login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
});
//register page
router.get("/register", (req, res) => {
  res.render("register");
});
// logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/");
});
//homepage
router.get("/homepage", ensureAuthenticated, (req, res) => {
  // collect current session used for the following pages
  req.session.user = req.user;
  userEmail = req.user.email;
  userCode = req.user.code;
  // userInform = req.user;
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
// tripAnalysis
router.get("/tripAnalysis", ensureAuthenticated, (req, res) => {
  res.render("tripAnalysis", {
    user: req.session.user,
  });
});
// driving monitor
router.get("/monitor", ensureAuthenticated, (req, res) => {
  res.render("monitor", {
    user: req.session.user,
  });
});
// delete user
router.get("/delete", (req, res) => {
  console.log(userEmail);
  try {
    usersCollection.deleteOne( { "email" : userEmail } );
 } catch (e) {
    print(e);
 }
 try {
  dataCollection.deleteMany( { "dongle" : userCode } );
} catch (e) {
  print(e);
}
  req.flash("success_msg", "User:" + userEmail +" with dongle: " + userCode +" has been deleted");
  res.redirect("/");
});

exports.router = router;
