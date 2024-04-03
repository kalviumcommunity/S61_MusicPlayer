const express = require("express");
const connectDB = require("./config/db");
const { musicRoute } = require("./router");
const {SingerModel}=require("./Schema")
const cors =require("cors")
const userRoute = require('./UserRoutes');
const UserModel = require('./Userschema');
connectDB();

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
  origin:'http://localhost:5173'
}))

app.get("/", (req, res) => {
  res.send("pong");
});

//routes
app.use("/api", musicRoute);
app.use('/admin', userRoute);

 app.get("/singer",async(req,res)=>{
  try {
     const places = await SingerModel.find();
     res.json(places);
} catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
 }
 })

 userRoute.get('/users', async (req, res) => {
  try {
      const users = await UserModel.find({}, {username:1});
      res.status(200).json(users);
  }catch(error){
      console.error('Error fetching users:', error);
      res.status(500).json({error:'Internal Server Error'})
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:',err);
  res.status(500).json({error:'Something went wrong!'});
});



app.listen(port, () => {
  console.log("Server is running");
});