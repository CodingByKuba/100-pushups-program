const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema(
  {
    authToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

module.exports = RevokedToken;
