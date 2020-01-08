const express = require("express");
const app = express();

app.get("/", (req, res) => {
  let page = "Home";
  const html = res.render("home", { page: page });
  console.log(html);
});
