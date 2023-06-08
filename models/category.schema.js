const mongoose = require("mongoose");

// Category schema
const categorySchema = new mongoose.Schema({
  category: { type: Array, required: true },
  subCategory: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
