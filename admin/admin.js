const path = require("path");
const express = require("express");
const admin = express();

admin.set("views", path.join(__dirname, "/_views"));
admin.use(express.static(path.join(__dirname, "/_public")));

admin.get("/", (req, res) => {
  res.render("index");
});

module.exports = admin;
