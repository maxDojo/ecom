const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  password: String,
  avatar: String
});
const Customer = mongoose.model("Customer", customerSchema);

const NewsLetter = mongoose.model(
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

function subNewsletter(data) {
  try {
    let user = new NewsLetter(data);
    return user.save();
  } catch (err) {
    console.log("Failed to add email to newsletter list!");
    return false;
  }
}

module.exports = {
  subNewsletter,
  newCustomer
};
