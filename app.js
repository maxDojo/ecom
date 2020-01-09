const express = require("express");
const app = express();
require("./db/dbConfig");
const info = require("./startup/info");
// const mongoose = require("mongoose");
const product = require("./db/products");
// mongoose has already been installed, just in case

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let result = await product.getProduct();
  res.render("index", { title: info.home, products: result });
});

app.post("/", async (req, res) => {
  let data = req.body,
    result = await product.addProduct(data);
  !result
    ? res.status(400).send("Failed to add Product, please check your input!")
    : res.status(200).redirect("/");
});

// let prod = new product.Product({
//   title: "Corn",
//   price: 2000,
//   image: "http://picsum.com/200",
//   short_desc: "Sweet Corn, you can almost smell the farm on it!",
//   desc:
//     "Corn is good for specific foods, very nutritious although quite expensive!",
//   stock: 2
// });

// prod.save();
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
