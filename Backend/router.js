const express = require('express');
const Joi = require('joi');
const { SingerModel } = require("./Schema");
const { Router } = require("express");
const musicRoute = express.Router();

// Define Joi schema for validation
const singerValidationSchema = Joi.object({
    Singer: Joi.string().required(),
    "Full Name": Joi.string().required(),
    Birthdate: Joi.date().required(),
    Birthplace: Joi.string().required(),
    Genre: Joi.string(),
    "Famous Songs": Joi.array().items(Joi.string()),
    Year: Joi.string(),
    Awards: Joi.object({
        "Grammy Awards": Joi.number(),
        "MTV Video Music Awards": Joi.number(),
        "BET Awards": Joi.number(),
    }),
    Nationality: Joi.string(),
    Education: Joi.string(),
    Description: Joi.string(),
    Country: Joi.string(),
}).options({ allowUnknown: true });

musicRoute.use(express.json());

musicRoute.post("/create", validateSinger, async (req, res) => {
    try {
        const prod = await SingerModel.create(req.body);
        res.status(200).send({ msg: "Data created successfully", prod });
    } catch (error) {
        res.status(500).json({ errMsg: "Invalid post request", error });
    }
});

musicRoute.get("/read", async (req, res) => {
    try {
        const data = await SingerModel.find();
        res.status(200).send({ msg: "Data received", data });
    } catch (error) {
        res.status(500).json({ errMsg: "Invalid get request", error });
    }
});

// update a singer
musicRoute.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const singer = await SingerModel.findByIdAndUpdate(id, req.body);

        if (!singer) {
            return res.status(404).json({ message: "singer not found" });
        }

        const updatedSinger = await SingerModel.findByIdAndUpdate(id);
        res.status(200).json(updatedSinger);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete a singer
musicRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const singer = await SingerModel.findByIdAndDelete(id);

        if (!singer) {
            return res.status(404).json({ message: "singer not found" });
        }

        res.status(200).json({ message: "singer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

function validateSinger(req, res, next) {
    const { error } = singerValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

module.exports = { musicRoute, singerValidationSchema };