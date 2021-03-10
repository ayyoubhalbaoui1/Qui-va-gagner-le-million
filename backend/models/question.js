const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quest: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  false_choices: {
    type: [String],
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
