const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/events", require("./routes/eventRoutes"));



app.get("/", (req, res) => {
  res.send("Community Sports API is running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});