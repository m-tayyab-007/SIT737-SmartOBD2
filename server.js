const express = require("express");
const router = express.Router();
const app = express();
let dbConnect = require("./dbConnect");
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
//passport config
require("./config/passport")(passport);
let http = require('http').createServer(app);
//EJS
app.set("view engine", "ejs");
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({ extended: false }));
//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// port
var port = process.env.PORT || 8080;
//express linking public folder
app.use(express.json());
app.use(express.static(__dirname + '/public'));
//Routes
app.use("/", require("./routes"));
app.use("/users", require("./routes/users"));

http.listen(port,()=>{
    console.log("Listening on port ", port);
  });

module.exports = app