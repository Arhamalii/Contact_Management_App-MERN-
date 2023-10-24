const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const cors = require("cors");
const morgan = require("morgan");
// connectDB
connectDB();

const app = express();

// middlewares
app.use(express.json({ extendden: false }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactRoute);

// home route
app.use("/", (req, res) => {
  res.send("Welcome to The Contact Management App");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
