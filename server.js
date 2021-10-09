const express = require("express");
const router = express.Router();
const app = express();
let dbConnect = require("./dbConnect");
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const defaultRoute = require("./routes");
const userRoute = require("./routes/users");
const dataRoute = require("./routes/sensor");
let http = require("http").createServer(app);
//socket io
let io = require("socket.io")(http);
//passport config
require("./config/passport")(passport);
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
app.use(express.static(__dirname + "/public"));
//Routes
app.use("/", defaultRoute.router);
app.use("/api/users", userRoute.router);
app.use("/api/data", dataRoute.router);

io.on("connection", (socket) => {
  console.log("User connected");
  let roomId;
  socket.on('tripDetected',(html) =>{
    socket.emit('trip button',html);
    console.log('1');
  })
  socket.on('range',(range)=>{
    if (range <=50) {
      roomId = 50;
      // socket.emit('join',roomId);
      // socket.join(roomId);
      // console.log(data.dongle + " in the location " + roomId);
    }  
    else if (50 < range <= 100) {
      roomId = 50100;
      // socket.emit('join',roomId);
      // socket.join(roomId);
      // console.log(data.dongle + " in the location " + roomId);
    } 
    else if (100 < range <= 150) {
      roomId = 100150;
      // socket.emit('join',roomId);
      // socket.join(roomId);
      // console.log(data.dongle + " in the location " + roomId);
    }
    socket.join(roomId);
    console.log(socket.rooms)
  });
  socket.on("sensorData", (data) => {
    console.log("sensor data detecting on " + data.dongle);
    if (data.temperature >= 213) {
      console.log("abnormal temperature detected: " + data.temperature);
      socket.emit("highTem", data.temperature);
      if (data.temperature >= 218) {
        // socket.broadcast.to(roomId).emit("alert", data.reg);
        socket.to(roomId).emit("alert", data);
        console.log("sent alert to users in location " + roomId);
      }
    } else {
      socket.emit("normalTem", data.temperature);
    }
    if (data.fuel >= 11) {
      console.log("abnormal fuel consumption detected: " + data.fuel);
      socket.emit("highFuel", data.fuel);
      if (data.fuel >= 12) {
        // socket.broadcast.to(roomId).emit("alert", data.reg);
        socket.to(roomId).emit("alert", data);
        console.log("sent alert to users in location " + roomId);
      }
    } else {
      socket.emit("normalFuel", data.oil);
    }
    if (data.brake <= 62) {
      console.log("abnormal brake performance detected: " + data.brake);
      socket.emit("lowBrake", data.brake);
      if (data.brake <= 56) {
        // socket.broadcast.to(roomId).emit("alert", data.reg);
        socket.to(roomId).emit("alert", data);
        console.log("sent alert to users in location " + roomId);
      }
    } else {
      socket.emit("normalBrake", data.brake);
    }
  });
  // socket.on("alertForRoom", (reg) => {
  //   socket.emit("alert", reg);
  // });
});

http.listen(port, () => {
  console.log("Listening on port ", port);
});
