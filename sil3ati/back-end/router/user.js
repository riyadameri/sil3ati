const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const Supplier = require('../models/user'); // Use a capitalized model name for consistency
const Key = require('../models/key'); // Ensure the model name is capitalized for consistency
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/user/profile_Picture');
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
      return res.status(422).json({ error: "User already exists with that email" });
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
        return res.status(200).json({ message: `Data sent. Please confirm with the ID: ${newKey._id}` });
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
      password: hashedPassword
    });
    await newSupplier.save();
    await Key.findByIdAndDelete(id); 
    return res.status(200).json({
      message: "Key confirmed and account created successfully",
      data: newSupplier
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

// login
router.get('/login', async (req, res) => {
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
    return res.status(200).json({ message: "Login successful", data: foundUser });  
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
