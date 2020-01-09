const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, default: "Generic" },
  image: { type: String },
  desc: String
});
const Category = mongoose.model("Category", categorySchema);

// Define functions for working with categories
function getCategory(id = "") {
  if (id == "") {
    try {
      return Category.find();
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    try {
      return Category.findById(id);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

function addCategory(data) {
  try {
    let category = new Category(data);
    return category.save();
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  addCategory,
  getCategory
};
