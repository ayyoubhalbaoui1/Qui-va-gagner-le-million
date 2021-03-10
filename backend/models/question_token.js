const mongoose = require("mongoose");



const questionTokenSchema = new mongoose.Schema({
  id_question: {
    type: mongoose.Types.ObjectId,
    ref: "questions",
  },
  id_participant: {
    type: mongoose.Types.ObjectId,
    ref: "participants",
  },
  participant_answer: {
    type: String
    
  }
});

module.exports = mongoose.model("QuestionToken", questionTokenSchema);
