const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const authMiddleware = require('../authMiddleware');

router.post('/addProduct', authMiddleware, (req, res) => {
  const { name, price, image, description, category, quantity } = req.body;
  if (!name || !price || !image || !description || !category || !quantity) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const supplierId = req.user.id; // Extract supplierId from req.user
    const newProduct = new Product({
      name,
      price,
      image,
      description,
      category,
      quantity,
      date: new Date(),
      supplierId: supplierId // Set supplierId from the token
    });
    newProduct.save()
      .then(() => res.status(200).json({ message: "Product added successfully" }))
      .catch(err => res.status(500).json({ error: "Something went wrong" }));

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});
router.delete(
  '/deleteProduct/:id',
  authMiddleware,
  async (req, res) => {
    const { id } = req.params;
    try {
      const foundProduct = await Product.findById(id);
      if (!foundProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
)

router.get(
  '/getProducts',
  authMiddleware,
  async (req, res) => {
    try {
      const products = await Product.find();
      return res.status(200).json({
        message: "Products fetched successfully",
        data: products
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  }
)
module.exports = router;
