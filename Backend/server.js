const express = require("express");
const connectDB = require("./config/db");
const { musicRoute } = require("./router");
connectDB();

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("pong");
});


//routes
app.use("/api", musicRoute);

app.listen(port, () => {
  console.log("Server is running");
});