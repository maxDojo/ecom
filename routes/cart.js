const { title, tags } = require("../startup/info");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("cart", {
    title: title.cart
  });
});

module.exports = router;
