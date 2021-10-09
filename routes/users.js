const express = require("express");
const router = express.Router();
const routerIndex = require("../routes/index").router;
const User = require("../models/user");
const bcrypt = require("bcrypt");
let db = require("../dbConnect");
let usersCollection;
setTimeout(() => {
  usersCollection = db.dbConnect.client.db().collection("users");
}, 500);
// let dbConnect = db.dbConnect;
//login handle
// router.get("/login", (req, res) => {
//   res.render("login");
// });
let render = false,
  renderObject,
  redirect = false;
//Register handle
router.post("/", (req, res) => {
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
  renderObject = {
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
  };
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
    renderObject.errors = errors;
    render = true;
    console.log("many registered errors");
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
        console.log("OBD2 code already registered");
        renderObject.errors = errors;
        render = true;
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
            console.log("email already registered");
            renderObject.errors = errors;
            render = true;
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
            // get the health information based on OBD2 device code registered
            function RandomData(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min
          }
            function healthCheck(code) {
              switch (code) {
                case "OBD001":
                    var iginition = RandomData(80, 100),
                    electric = RandomData(63, 100),
                    coolant = RandomData(40, 100),
                    lubrication = RandomData(68, 100),
                    exhaust = RandomData(65, 100),
                    fuel = RandomData(79, 100),
                    overall = Math.round((iginition + electric + coolant + lubrication + exhaust + fuel) / 6);
                  break;
                case "OBD002":
                  var iginition = RandomData(80, 100),
                    electric = RandomData(63, 100),
                    coolant = RandomData(40, 100),
                    lubrication = RandomData(68, 100),
                    exhaust = RandomData(65, 100),
                    fuel = RandomData(79, 100),
                    overall = Math.round((iginition + electric + coolant + lubrication + exhaust + fuel) / 6);
                  break;
                case "OBD003":
                  var iginition = RandomData(80, 100),
                    electric = RandomData(63, 100),
                    coolant = RandomData(40, 100),
                    lubrication = RandomData(68, 100),
                    exhaust = RandomData(65, 100),
                    fuel = RandomData(79, 100),
                    overall = Math.round((iginition + electric + coolant + lubrication + exhaust + fuel) / 6);
                  break;
              }
              return {iginition: iginition,
                      electric: electric,
                      coolant: coolant,
                      lubrication: lubrication,
                      exhaust: exhaust,
                      fuel: fuel,
                      overall: overall};
            }
            //get the node-red url that simulates the OBD dongle
            function urlCheck(code) {
              switch (code) {
                case "OBD001":
                  var url = "http://localhost:1881/ui";
                  break;
                case "OBD002":
                  var url = "http://localhost:1882/ui";
                  break;
                case "OBD003":
                  var url = "http://localhost:1883/ui";
                  break;
              }
              return url;
            }
            //new user created
            const newUser = new User({
              code: code,
              first_name: first_name,
              email: email,
              password: password,
              car: [brand, model, year, series, engine],
              car_health: healthCheck(code),
              url: urlCheck(code),
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
                    redirect = true;
                    req.flash("success_msg", "You have now registered!");
                    res.redirect("/");
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
router.get("/", (req, res) => {
  if (render) {
    res.render("register", {
      errors: renderObject.errors,
      first_name: renderObject.first_name,
      email: renderObject.email,
      password: renderObject.password,
      password2: renderObject.password2,
      brand: renderObject.brand,
      model: renderObject.model,
      year: renderObject.year,
      series: renderObject.series,
      engine: renderObject.engine,
    });
    render = false;
  } else if (redirect) {
    req.flash("success_msg", "You have now registered!");
    res.redirect("/");
    redirect = false;
  } else {
    usersCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  }
});
exports.router = router;