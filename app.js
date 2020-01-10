const express = require("express");
const app = express();
require("./db/dbConfig");
const info = require("./startup/info");
// const mongoose = require("mongoose");
const product = require("./db/products");
const customer = require("./db/customers");
const category = require("./db/categories");
// mongoose has already been installed, just in case

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let products = await product.getProduct();
  let categories = await category.getCategory();
  res.render("index", {
    title: info.home,
    products: products,
    cat: categories
  });
});

app.post("/", async (req, res) => {
  let data = req.body,
    result = await product.addProduct(data);
  !result
    ? res.status(400).send("Failed to add Product, please check your input!")
    : res.status(200).redirect("/");
});

app.post("/sub_news", async (req, res) => {
  const data = req.body;
  if (!data) req.status(400).send("Please input a valid email address!");
  result = await customer.subNewsletter(data);
  if (!result) res.status(500).send("Internal Error, please try again!");
  res.status(200).send("<b>Subscribed Successfully!<b>");
});

// let cat = new category.Category({
//   title: "Groceries",
//   image: "http://picsum.com/200",
//   desc: "Look here for groceries and other delectibles!"
// });

// cat.save();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
