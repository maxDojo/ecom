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

async function subNewsletter(data) {
  if (data.email == "") return 3;
  try {
    const subscriptions = await NewsLetter.find(data);
    if (subscriptions.length > 0) {
      return 1;
    } else {
      let user = new NewsLetter(data);
      return user.save();
    }
  } catch (err) {
    return 2;
  }
}

function newsList() {
  return NewsLetter.find().catch(err => {
    return false;
  });
}

module.exports = {
  subNewsletter,
  newCustomer,
  newsList
};
