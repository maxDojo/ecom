const product = require("../db/products");
const { title, tags } = require("../startup/info");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("product", {
    title: title.cat
  });
});

module.exports = router;
