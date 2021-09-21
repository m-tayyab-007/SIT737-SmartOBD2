const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { model } = require("mongoose");
//login handle
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
//Register handle
router.post("/register", (req, res) => {
  const {
    code,
    first_name,
    email,
    password,
    password2,
    brand,
    model,
    year,
    series,
    engine,
  } = req.body;
  let errors = [];
  console.log(
    " OBD2 code :" +
      code +
      " Name :" +
      first_name +
      " email :" +
      email +
      " pass:" +
      password
  );
  if (
    !code ||
    !first_name ||
    !email ||
    !password ||
    !password2 ||
    !brand ||
    !model ||
    !year ||
    !series ||
    !engine
  ) {
    errors.push({ msg: "Please fill in required fields" });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      code: code,
      first_name: first_name,
      email: email,
      password: password,
      password2: password2,
      brand: brand,
      model: model,
      year: year,
      series: series,
      engine: engine,
    });
  } else {
    //check if OBD2 series code is registered
    User.findOne({ code: code }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "OBD2 code already registered" });
        res.render("register", {
          errors,
          code,
          first_name,
          email,
          password,
          password2,
          brand,
          model,
          year,
          series,
          engine,
        });
      } else {
        //check if email is registered
        User.findOne({ email: email }).exec((err, user) => {
          console.log(user);
          if (user) {
            errors.push({ msg: "email already registered" });
            res.render("register", {
              errors,
              code,
              first_name,
              email,
              password,
              password2,
              brand,
              model,
              year,
              series,
              engine,
            });
          } else {
            //get the health information based on OBD2 device code registered
            function healthCheck(code) {
              switch (code) {
                case "SMART-OBD2-19012021-001":
                var proportions = {
                    iginition: 99,
                    electric: 98,
                    coolant: 92,
                    lubrication: 95,
                    exhaust: 94,
                    fuel: 92,
                    overall: 95,
                  };
                  break;
                case "SMART-OBD2-19012021-002":
                  var proportions = {
                    iginition: 99,
                    electric: 98,
                    coolant: 92,
                    lubrication: 95,
                    exhaust: 94,
                    fuel: 92,
                    overall: 95,
                  };
                case "SMART-OBD2-21012021-010":
                  var proportions = {
                    iginition: 99,
                    electric: 98,
                    coolant: 92,
                    lubrication: 95,
                    exhaust: 94,
                    fuel: 92,
                    overall: 94,
                  };
              }
              return proportions;
            }
            //new user created
            const newUser = new User({
              code: code,
              first_name: first_name,
              email: email,
              password: password,
              car: [brand, model, year, series, engine],
              car_health: healthCheck(code),
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                //save pass to hash
                newUser.password = hash;
                //save user
                newUser
                  .save()
                  .then((value) => {
                    console.log(value);
                    req.flash("success_msg", "You have now registered!");
                    res.redirect("/users/login");
                  })
                  .catch((value) => console.log(value));
              })
            );
          }
        });
      }
    });
  }
});
//login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/homepage",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});
//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Now logged out");
  res.redirect("/users/login");
});
module.exports = router;
