const express = require("express");
const app = express();
require("./db/dbConfig");
const customer = require("./db/customers");
const { title, tags } = require("./startup/info");
const product = require("./db/products");
const category = require("./db/categories");

const blogRoutes = require("./routes/blog");
const cartRoutes = require("./routes/cart");
const categoryRoutes = require("./routes/categories");
const checkoutRoutes = require("./routes/checkout");
const productRoutes = require("./routes/products");

require("./routes/mail");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/blog", blogRoutes);
app.use("/cart", cartRoutes);
app.use("/categories", categoryRoutes);
app.use("/checkout", checkoutRoutes);
app.use("products", productRoutes);

app.post("/sub_news", async (req, res) => {
  const data = req.body;
  let result = await customer.subNewsletter(data);
  if (result == 3) res.status(400).send("Please input a valid email address!");
  console.log(result);
  if (result == 1) res.status(401).send("Already subscribed to newsletter!");
  else if (result == 2) {
    res
      .status(500)
      .send("Failed to add email to Newsletter, please try again later!");
  } else res.status(200).send("<b>Subscribed Successfully!<b>");
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
