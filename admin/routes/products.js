require("../../db/dbConfig");
const express = require("express");
const router = express.Router();

const { getProduct, addProduct, search } = require("../../db/products");

router.get("/", async (req, res) => {
  const products = await getProduct();
  res.render("products", { products: products });
});

module.exports = router;
