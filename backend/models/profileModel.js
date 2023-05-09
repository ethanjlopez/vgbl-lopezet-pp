const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Game = require("../models/gameModel");

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
