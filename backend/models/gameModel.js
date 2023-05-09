const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameID: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      required: true,
    },
    data: {
      type: Array,
    },
    userRating: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
