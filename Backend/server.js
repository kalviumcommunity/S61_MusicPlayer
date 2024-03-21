const express = require("express");
const connectDB = require("./config/db");
const { musicRoute } = require("./router");
const cors =require("cors")
connectDB();

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin:'http://localhost:5174'
}))

app.get("/", (req, res) => {
  res.send("pong");
});

 app.get("/singer",async(req,res)=>{
  try {
     const places = await PlaceModel.find();
     res.json(places);
} catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
 }
 })

//routes
app.use("/api", musicRoute);

app.listen(port, () => {
  console.log("Server is running");
});