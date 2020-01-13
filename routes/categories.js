const category = require("../db/categories");
const { title, tags } = require("../startup/info");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("categories", {
    title: title.cat
  });
});

module.exports = router;
