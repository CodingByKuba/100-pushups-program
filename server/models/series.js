const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema(
  {
    accountId: {
      type: String,
      required: true,
    },
    seriesId: {
      type: String,
      required: true,
    },
    dedicatedForStage: {
      type: String,
      required: true,
    },
    seriesIndex: {
      type: Number,
      required: true,
    },
    seriesToMake: {
      type: Array,
      required: true,
    },
    seriesFinished: {
      type: Array,
      required: true,
    },
    breakInSeconds: {
      type: Number,
      required: true,
    },
    breakInDays: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;
