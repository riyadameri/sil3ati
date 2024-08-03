const mongoose = require('mongoose')

const supplier = mongoose.model("Supplier", 
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    address : String,
    date : String,
    profile_Picture : {
      type : String ,
      default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    shopOrSupplier:{
      type : String,
      default : 'shop'
    }
  }
)

module.exports = supplier; 


    
      