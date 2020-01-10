const express = require("express");
const app = express();
require("./db/dbConfig");
const { title, tags } = require("./startup/info");
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
    title: title.home,
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

app.get("/cart", (req, res) => {
  res.render("cart", {
    title: title.cart
  });
});

app.get("/blog", (req, res) => {
  res.render("blog", {
    title: title.blog
  });
});

app.get("/categories", (req, res) => {
  res.render("categories", {
    title: title.cat
  });
});

app.get("/product", (req, res) => {
  res.render("product", {
    title: title.cat
  });
});

app.get("/checkout", (req, res) => {
  res.render("checkout", {
    title: title.checkout
  });
});

app.get("/search", async (req, res) => {
  let searchQuery = req.query._search;
  let result = await product.search(searchQuery);
  console.log(result);
  res.render("listings", {
    title: title.cat,
    result: result,
    query: searchQuery
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
