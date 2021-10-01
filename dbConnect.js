// const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
//mongoose
mongoose
  .connect(
    "mongodb+srv://dbUser:Deakin2021@sit725-2021-t2-week4.9iugr.mongodb.net/obd2?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

var dbConnect = mongoose.connection;
// connect = mongoose.connection;

//mongodb
// const uri =
//   "mongodb+srv://dbUser:Deakin2021@sit725-2021-t2-week4.9iugr.mongodb.net/test?retryWrites=true&w=majority";
// const mongoClient = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// mongoClient.connect((err, db) => {
//   if (!err) {
//     console.log("Database Connected");
//   } else {
//     console.log("[error]", err);
//   }
// });
// exports.mongoClient = mongoClient;
exports.dbConnect = dbConnect;
// exports.mongoose = mongoose;
