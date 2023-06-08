const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const DB = require("./config/connection");
const authRoute = require("./routes/auth.route");
const dashboardRoute = require("./routes/dashboard.route");
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.listen(PORT, () => {
  console.log("Our Server is listening on port ", PORT);
});
