const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const conDb = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB successfully connected: ${conDb}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = dbConnection;
