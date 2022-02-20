const { Schema, model, Types } = require("mongoose");

var schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  todos: [{ type: Types.ObjectId, ref: "Todo" }],
});

module.exports = model("User", schema);
