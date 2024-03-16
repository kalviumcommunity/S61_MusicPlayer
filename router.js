const { SingerModel } = require("./Schema");
const { Router, application } = require("express");

const musicRoute = Router();

musicRoute.post("/create", async (req, res) => {
try {
   const prod =  await SingerModel.create(req.body)
  res.status(200).send({msg: "Data created successfully", prod})
} catch (error) {
    res.status(500).json({errMsg:"Invalid post request", error})
}
})

musicRoute.get("/read", async (req, res) => {
  try {
      const data = await SingerModel.find()
      res.status(200).send({msg:"Data received",data})
  } catch (error) {
      res.status(500).json({errMsg:"Invalid get request", error})
  }
});


musicRoute.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
    
        const product = await SingerModel.findByIdAndUpdate(id, req.body);
    
        if (!product) {
          return res.status(404).json({ message: "singer not found" });
        }
    
        const updatedProduct = await SingerModel.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }

  });


  musicRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const product = await SingerModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "singer not found" });
        }

        res.status(200).json({ message: "singer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});












  
  





module.exports = { musicRoute };
