const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const Supplier = require('../models/user');
const Key = require('../models/key');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const supplier = require('../models/user');
const authMiddleware = require('../authMiddleware');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/user/profile_Pictures'); // Adjusted to be plural
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + 'redox' + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// Generate sequential key
function generateKey() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Create new account and send confirmation key
router.post('/newAccount', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !password || !phone || !address) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const savedUser = await Supplier.findOne({ email });
    if (savedUser) {
      return res.status(422).json({ success: false, error: "User already exists with that email" });
    }
    const confirmationKey = generateKey();
    const newKey = new Key({ key: confirmationKey });
    await newKey.save();
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'riyadammmeri@gmail.com',
        pass: 'tnix ryfx obyq sris'
      }
    });
    let mailOptions = {
      from: 'riyadammmeri@gmail.com',
      to: email,
      subject: 'Redox Confirmation Key, Sil3ati App',
      text: `Hello, are you ${name}? Your confirmation key is ${confirmationKey}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ confirmId: newKey._id, message: `Data sent. Please confirm with the ID: ${newKey._id}` });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Confirm the key and create the supplier
router.post('/confirm/:id', async (req, res) => {
  const { id } = req.params;
  const { key, name, email, password, phone, address } = req.body;
  if (!key || !name || !email || !password || !phone || !address) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const foundKey = await Key.findById(id);
    if (!foundKey || foundKey.key !== key) {
      return res.status(422).json({ error: "Invalid key" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSupplier = new Supplier({
      name,
      email,
      phone,
      address,
      date: new Date(),
      password: hashedPassword,
      profile_Picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    });
    await newSupplier.save();
    await Key.findByIdAndDelete(id); 
    return res.status(200).json({
      message: "Key confirmed and account created successfully",
      data: newSupplier,
      success: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update profile picture
router.put('/updateProfilePicture/:id', upload.single('profile_Picture'), async (req, res) => {
  const { id } = req.params;
  try {
    const foundUser = await Supplier.findById(id);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    foundUser.profile_Picture = req.file.path;
    await foundUser.save();

    return res.status(200).json({ message: "Profile picture updated successfully", data: foundUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login route - Changed to POST request
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const foundUser = await Supplier.findOne({ email });
    if (!foundUser) { 
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser._id,
        profile_Picture: foundUser.profile_Picture,
        shopOrSupplier: foundUser.shopOrSupplier,
        address : foundUser.address,
        date : foundUser.date,
        phone : foundUser.phone,
      },
      'hgjkhgkjtygjhktg86r565GFHGHFTWFERgjhghgRiyadAmeri',
      { expiresIn: "1h" }
    );

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.status(200).json({
      success: true,
      status: 200,
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser._id,
      profile_Picture: foundUser.profile_Picture,
      shopOrSupplier: foundUser.shopOrSupplier,
      date: foundUser.date,
      message: "Login successful",
      token : token ,
      phone : foundUser.phone,
      address : foundUser.address
      
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});


// Get all suppliers
router.get('/getUser', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({
      message: "Suppliers fetched successfully",
      data: suppliers.map(
        (supplier) => ({
          name: supplier.name,
          email: supplier.email,
          id: supplier._id,
          profile_Picture: supplier.profile_Picture,
          shopOrSupplier: supplier.shopOrSupplier,
          date: supplier.date
        })
      )
    }
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});


router.get("/getUserDataById/:id",authMiddleware,(req,res)=>{
  const id = req.params ;
  Supplier.findById(id).then((supplier)=>{
    res.status(200).json({
      message: "Supplier fetched successfully",
      data: supplier,
    })
  })
  .catch((err)=>{
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  })
})



module.exports = router;
