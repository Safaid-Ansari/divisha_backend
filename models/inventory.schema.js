const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  productName: { type: String, required: true },
  mrp: { type: Number, required: true },
  sp: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: [{ type: String }],
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
