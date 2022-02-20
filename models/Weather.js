const { Schema, model, Types } = require("mongoose");

var schema = new Schema({
  // owner: { type: Types.ObjectId, ref: "User" },
  city: { type: String },
  // temperature: { type: String },
  // description: { type: String },
  // icon: { type: String },
});

module.exports = model("Weather", schema);
