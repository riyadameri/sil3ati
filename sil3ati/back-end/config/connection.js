const mongoose = require('mongoose');

try{
  mongoose.connect(
    'mongodb://localhost:27017/sil3atidb',
  ).then(
    console.log('database connected successfully')
  )
}catch{
  (err)=>{
    console.log(err)
    process.exit(1)
  }
}

module.exports = mongoose ;