const mongoose = require("mongoose");
//wrap mongoose around local connection to MongoDB
//db name is included in here
mongoose.connect("mongodb://127.0.0.1:27017/myUserDBTest");
//exports connection
module.exports = mongoose.connection;
