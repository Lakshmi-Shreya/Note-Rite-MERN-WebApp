const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const requireLogin = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      res
        .status(422)
        .json({ msg: "Login Is Required or Authentication Failed " });
    }
  } else {
    res.status(422).json({ msg: "No Authentication Found" });
  }
};

module.exports = requireLogin;
