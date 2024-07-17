// importing lb 
const express = require('express');
const app = express();

// importing connection with data bases 
const connection = require('./config/connection');

// using json to access external data
app.use(express.json());

//routers apis
supplierApi = require('./router/supplier')

// import router
app.use('/supplier',supplierApi)

//creating server
port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`server status : working on port ${port}`);
})