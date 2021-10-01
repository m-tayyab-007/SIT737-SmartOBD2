const mongoose = require("mongoose");
//mongoose
mongoose
  .connect(
    "mongodb+srv://dbUser:Deakin2021@sit725-2021-t2-week4.9iugr.mongodb.net/obd2?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
  
exports.mongoose = mongoose;