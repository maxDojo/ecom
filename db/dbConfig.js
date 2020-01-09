const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/ecom", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to mongoDB database ecom!"))
  .catch(() => console.log("Failed to connect to ecom database!!"));
