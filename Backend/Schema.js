const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SingerSchema = new Schema(
  { 
    Singer: { type: String, required: true },
    "Full Name": { type: String, required: true },
    Birthdate: { type: Date, required: true },
    Birthplace: { type: String, required: true },
    Genre: { type: String },
    "Famous Songs": { type: Array },
    Year: { type: String },
    Awards: {
      "Grammy Awards": { type: Number },
      "MTV Video Music Awards": { type: Number },
      "BET Awards": { type: Number },
    },
    Nationality: { type: String },
    Education: { type: String },
    Description: { type: String },
    Country: { type: String },
    createdBy:{
      type: String
    }
  },
  { timestamps: true },

);

const SingerModel = mongoose.model("Singer", SingerSchema);
module.exports = { SingerModel };
