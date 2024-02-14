const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    stageUnlocked: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
