const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.middleware");
const authController = require("../controllers/auth.controller");
router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router.get("/", protect, authController.getUsers);
module.exports = router;
