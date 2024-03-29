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
    currentStage: {
      type: String,
    },
    seriesLock: {
      type: Date,
    },
    testNeeded: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
