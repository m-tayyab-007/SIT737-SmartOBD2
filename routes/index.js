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
  res.render("homepage", {
    user: req.user,
  });
});
router.get("/healthReport", ensureAuthenticated, (req, res) => {
  res.render("healthReport", {
    user: req.user,
  });
});
module.exports = router;
