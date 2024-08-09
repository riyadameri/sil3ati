// importing lb 
const express = require('express');
const app = express();
const path = require('path');

// importing connection with data bases 
require('./config/connection');
const cors = require('cors');
app.use(cors())
// using json to access external data
app.use(express.json());
//routers apis
AccountApi = require('./router/user')
productsApi = require('./router/product')

app.use('/uploads', express.static(path.join(__dirname, 'uploads/user/profile_Pictures')));
app.use('/Produploads', express.static(path.join(__dirname, 'uploads/products/images')));


// import router
app.use('/user',AccountApi);
app.use('/products',productsApi);

//creating server
port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`server status : working on port ${port}`);
})

