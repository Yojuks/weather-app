const { Schema, model, Types } = require("mongoose");

var schema = new Schema({
  city: { type: String },
  temperature: { type: String },
  description: { type: String },
  icon: { type: String },
});

module.exports = model("Weather", schema);
