const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  id_group_members: {
    type: mongoose.Types.ObjectId,
    ref: "groupmembers",
  },
  id_question: {
    type: mongoose.Types.ObjectId,
    ref: "questions",
  },
  id_question_token: {
    type: mongoose.Types.ObjectId,
    ref: "questiontokens",
  },
  is_answered: {
    type : Boolean
  }
});

module.exports = mongoose.model("Round", roundSchema);
