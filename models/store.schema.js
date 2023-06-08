const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: { type: String },
  gst: { type: String },
  logo: { type: String },
  storeTimings: { type: String },
});
const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
