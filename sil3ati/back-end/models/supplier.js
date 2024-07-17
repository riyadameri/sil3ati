const mongoose = require('mongoose')
const supplier = mongoose.model("Supplier", 
  {
    name: String,
    email: String,
    password: String,
    phone: Number,
    address : String,
    date : String,
    profile_Picture : String
  }
)

module.exports = supplier; 
