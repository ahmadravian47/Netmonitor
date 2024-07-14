const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require("mongoose");
const User = require('./models/User');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.DB_STRING)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());



app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }
  const newUser = new User({ name: name, email: email, password: password });
  const user_id = newUser._id;
  newUser.save().then(() => {
    const token = jwt.sign({ id: user_id, name: name, email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie('authToken', token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 3600), // 1 hour
      httpOnly: true,
      sameSite: "lax", // Required for cross-site cookies
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    });
    return res.status(200).json({ message: "Successfully Signed Up", user: newUser, token, });
  })
    .catch((err) => {
      return res.status(500).json({ message: "Error Signing Up!" });
    });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Email!" });
  }
  if (password !== user.password) {
    return res.status(400).json({ message: "Invalid Password!" });
  }
  const token = jwt.sign({ id: user._id, name: user.name, type: user.type }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h", // Corrected to "1h"
  });
  res.cookie('authToken', token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 3600), 
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", 
  });
  return res.status(200).json({
    message: "Successfully Logged In",
    user: user,
    token,
  });
});

app.post('/check', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      res.json({ message: 'Website is active' });
    } else {
      res.json({ message: 'Website is down' });
    }
  } catch (error) {
    res.json({ message: 'Website is down' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


