const mongoose = require('mongoose')
const products = mongoose.model("ProductsData",
  {
    name : String,
    price : Number,
    image : String,
    description : String,
    category : String,
    quantity : Number,
    date : String,
    supplierId : String,

  }
)
module.exports = products ;