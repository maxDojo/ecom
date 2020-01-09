const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: Number,
  image: String,
  short_desc: String,
  desc: String,
  category: mongoose.Schema.Types.ObjectId,
  date_added: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 }
});
const Product = mongoose.model("Product", productSchema);

// Define functions for modifying products
function getProduct(id = "") {
  if (id == "") {
    try {
      return Product.find();
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    try {
      return Product.findById(id);
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

function addProduct(data) {
  try {
    let product = new Product(data);
    return product.save();
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getProduct,
  addProduct
};
