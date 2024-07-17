const mongoose = require('mongoose');

const key = mongoose.model("KeyData",
  {
    key : String 
  }
)

module.exports = key ;