const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.middleware");
const dashboardController = require("../controllers/dashboard.controller");
router.post("/store", protect, dashboardController.store);
router.post("/category", protect, dashboardController.addCategory);
router.post("/inventory", protect, dashboardController.addInventory);
router.get("/inventory/search", protect, dashboardController.searchInventory);
router.get(
  "/inventory/:sellerUrl",
  protect,
  dashboardController.getInventoryBySellerUrl
);

module.exports = router;
