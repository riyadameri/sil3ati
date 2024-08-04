const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const authMiddleware = require('../authMiddleware');


router.post('/addProduct',authMiddleware,(req,res)=>{
  const cnf = authMiddleware ;
  console.log(authMiddleware)
  const { name, price, image, description, category, quantity, } = req.body;

  if (!name || !price || !image || !description || !category || !quantity) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      category,
      quantity,
      date: new Date(),
      supplierId : cnf.userId

    });
    newProduct.save();
    return res.status(200).json({ message: "Product added successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }

});

module.exports = router;
