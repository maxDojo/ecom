const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  password: String,
  avatar: String
});
const Customer = mongoose.model("Customer", customerSchema);

const newsLetter = mongoose.model(
  "Newsletter",
  mongoose.Schema({
    email: { type: String, required: true },
    name: String
  })
);

// Functions
function newCustomer(data) {
  try {
    let customer = new Customer(data);
    return customer.save();
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {};
