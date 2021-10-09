const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

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
exports.router = router;