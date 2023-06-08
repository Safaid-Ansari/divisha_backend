const asyncHandler = require("express-async-handler");
const Store = require("../models/store.schema");
const Category = require("../models/category.schema");
const Inventory = require("../models/inventory.schema");
const User = require("../models/user.schema");
module.exports.store = asyncHandler(async (req, res) => {
  try {
    const { userId, address, gst, logo, storeTimings } = req.body;

    // Create a new store
    const newStore = new Store({ userId, address, gst, logo, storeTimings });

    // Save the store to the database
    await newStore.save();

    return res
      .status(201)
      .json({ message: "Store info added successfully", store: newStore });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
});

module.exports.addCategory = asyncHandler(async (req, res) => {
  try {
    const { category, subCategory } = req.body;

    // Create a new category
    const newCategory = new Category({
      category,
      subCategory,
    });

    // Save the category to the database
    await newCategory.save();

    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.addInventory = asyncHandler(async (req, res) => {
  try {
    const { userId, categoryId, productName, mrp, sp, quantity, images } =
      req.body;

    // Create a new inventory item
    const newInventory = new Inventory({
      userId,
      categoryId,
      productName,
      mrp,
      sp,
      quantity,
      images,
    });

    // Save the inventory item to the database
    await newInventory.save();

    return res.status(201).json({
      message: "Inventory item added successfully",
      inventory: newInventory,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.getInventoryBySellerUrl = asyncHandler(async (req, res) => {
  try {
    const { sellerUrl } = req.params;

    // Find the user based on the seller URL
    const user = await User.findOne({ sellerUrl });

    if (!user) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Find the inventory items belonging to the user
    const inventoryItems = await Inventory.find({ userId: user._id });

    return res.status(200).json({ inventory: inventoryItems });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
});

module.exports.searchInventory = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    console.log("query", query);
    // Search for inventory items by product name
    const inventoryItems = await Inventory.find({
      productName: { $regex: query, $options: "i" },
    });

    return res.status(200).json({ inventory: inventoryItems });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
});
