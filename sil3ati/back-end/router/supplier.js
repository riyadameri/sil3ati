const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const supplier = require('../models/supplier');
const Key = require('../models/key'); // Ensure the model name is capitalized for consistency
const bcrypt = require('bcrypt') ;
const key = require('../models/key');


// Generate sequential key
function generateKey() {
  return Math.floor(1000 + Math.random() * 9000).toString();
  
}

// Create new account and send confirmation key
router.post('/newAccount', async (req, res) => {
  const { name, email, password, phone, address, profile_Picture } = req.body;
  
  if (!name || !email || !password || !phone || !address) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const savedUser = await supplier.findOne({ email: email });
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
  const { key, name, email, password, phone, address, profile_Picture  } = req.body;
  if (!key || !name || !email || !password || !phone || !password ) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const foundKey = await Key.findById(id);
    if (!foundKey || foundKey.key !== key) {
      return res.status(422).json({ error: "Invalid key" });
    }
    hashedPassword = await bcrypt.hash(password,10)
    const newSupplier = new supplier({
      name,
      email,
      phone,
      address,
      date: new Date(),
      password : hashedPassword ,
      profile_Picture
    });
    await newSupplier.save();
    return res.status(200).json({ message: "Key confirmed and account created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});











router.delete('/removeEvryThink',
  (req,res)=>{
    key.deleteMany()
      .then(
        console.log("done")
      )
    supplier.deleteMany()
    .then(
      console.log("done")
    )
  }
)
module.exports = router;
