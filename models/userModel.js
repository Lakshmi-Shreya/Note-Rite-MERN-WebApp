const mongooose = require("mongoose");
// creating user schema
const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/slybls/image/upload/v1632894627/profiledefault_cnflof.jpg",
  },
});
//creating user model
const UserMod = mongooose.model("User", userSchema);
module.exports = UserMod;
