require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true
});

const db = mongoose.connection;
module.exports = db;