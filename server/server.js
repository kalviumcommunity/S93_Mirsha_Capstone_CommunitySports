const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();
app.use(express.json());



app.use("/api/events", (req, res, next) => {
  console.log("EVENT REQUEST:", req.method, req.originalUrl);
  next();
}, require("./routes/eventRoutes"));

app.use("/api/registrations", require("./routes/registrationRoutes"));



app.get("/", (req, res) => {
  res.send("Community Sports API is running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});