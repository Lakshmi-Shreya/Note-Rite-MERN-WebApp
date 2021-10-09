const express = require("express");
// const notes = require("./testData/notesList");
const dotenv = require("dotenv");
const path = require("path");
// importing connection configuration file of mongodb using mongoose
const dbConnection = require("./config/db");
const app = express();
//calling dotenv config for .env file
dotenv.config();
// calling database config function set up in database connection configuration file
dbConnection();
const PORT = process.env.PORT;

//parsing to json
app.use(express.json());
//importing user authentication route
app.use(require("./routes/userAuth"));

//importing notes route
app.use(require("./routes/notes"));
// setting up for deployment
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
}

// app.get("/mynotes", (req, res) => {
//   res.json(notes);
// });
// app.get("/mynotes/:id", (req, res) => {
//   console.log(req.params.id);
//   const note = notes.find((n) => n._id === JSON.parse(req.params.id));
//   res.json(note);
// });
//setting up port and server
// app.listen(PORT, () => {
//   console.log(`Server is up and running on port ${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
