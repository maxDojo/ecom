const { title, tags } = require("../startup/info");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("blog", {
    title: title.blog
  });
});

module.exports = router;
