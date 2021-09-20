const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
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
  req.session.user = req.user;
  res.render("homepage", {
    user: req.user,
  });
});
// healthCheck
router.get("/healthReport", ensureAuthenticated, (req, res) => {
  res.render("healthReport", {
    user: req.session.user,
  });
});
module.exports = router;
