const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema(
  {
    accoundId: {
      type: String,
      required: true,
    },
    stageId: {
      type: String,
      required: true,
    },
    stageLevel: {
      type: Number,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Stage = mongoose.model("Stage", stageSchema);

module.exports = Stage;
