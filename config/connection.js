const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((data) => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error to connected the database", err);
  });
