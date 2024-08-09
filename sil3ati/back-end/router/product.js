const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const authMiddleware = require('../authMiddleware');
const { Message } = require('twilio/lib/twiml/MessagingResponse');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/products/images'); // Adjusted to be plural
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'redox' + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });
router.post('/addProduct', authMiddleware, upload.single('ProductImage'), (req, res) => {
  console.log('Uploaded file:', req.file); // Debugging line
  const { name, price, description, category, quantity } = req.body;
  if (!name || !price || !description || !category || !quantity) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const supplierId = req.user.id; // Extract supplierId from req.user
    const newProduct = new Product({
      name,
      price,
      image: req.file?.path || "1234567890123456789012341723147017272-redox-379155292.png",
      description,
      category,
      quantity,
      date: new Date(),
      supplierId: supplierId,
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

router.get(
  '/getAllProductsOfUser/:id',
  (req,res) =>{
    const { id } = req.params;
    Product.find({supplierId: id})
    .then((products) => {
      return res.status(200).json({
        message: "Products fetched successfully",
        data: products
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    });
  }
)


module.exports = router;
