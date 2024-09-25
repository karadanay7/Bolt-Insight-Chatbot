const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  user: { type: Schema.Types.String, ref: "User", required: true },
  interactions: [
    {
      question: { type: String, required: true },
      answer: { type: String, default: "" },
    },
  ],
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
});

module.exports = mongoose.model("Session", sessionSchema);
