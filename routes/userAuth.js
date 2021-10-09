const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//importing user model
const UserMod = require("../models/userModel");
const router = express.Router();

//generating json web token

const genWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

// signup route
router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;
  //checking if user has not entered details but clicking submit button
  if (!name || !email || !password) {
    return await res
      .status(422)
      .json({ msg: "Please Enter Details In All Fields!!!" });
  }
  //checkig if user already exists in database
  const savedUser = await UserMod.findOne({ email });
  if (savedUser) {
    res.status(422).json({ msg: "User Already Exists! Kindly Login..." });
  }
  //saving new user info in db after hashing password
  else {
    const hashedPassword = await bcrypt.hash(password, 14);
    //creating new user document in UserMod model
    const user = await new UserMod({
      name,
      email,
      password: hashedPassword,
      pic,
    });
    //saving new user document in database
    await user.save();
    res.json({
      msg: "Successfully Saved ",
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
      //  token: genWebToken(user._id)
    });
  }
});
// route to login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //checking if user has not entered details but clicking submit button
  if (!email || !password) {
    return await res
      .status(422)
      .json({ msg: "Please Enter The Details In All Fields!!!" });
  }
  //checking user already present in databse
  const validUser = await UserMod.findOne({ email });

  //matchig user entered password with user registered password preent in database
  const passCheck = async () => {
    return await bcrypt.compare(password, validUser.password);
  };
  //checking if user entered valid details or not
  if (validUser && (await passCheck())) {
    res.json({
      msg: "Login successfull",
      name: validUser.name,
      email: validUser.email,
      password: validUser.password,
      pic: validUser.pic,
      token: genWebToken(validUser._id),
    });
  } else {
    res.status(422).json({
      msg: "Invalid Email Or Password! Kindly Enter valid details...",
    });
  }
});
module.exports = router;
