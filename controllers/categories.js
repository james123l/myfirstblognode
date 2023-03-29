const Category = require("../models/Category");

const save = async (req,res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
}

const find = async (req,res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const updatedCat = await Category.findOneAndUpdate(
            { name: req.body.name },
            { $set: { name: req.body.newname } },
            { new: true }
        );
        res.status(200).json(updatedCat);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteCat = async (req, res) => {
    try {
        const deletedCat = await Category.findOneAndDelete({ name: req.body.name });
        res.status(200).json(deletedCat);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {find, save, update, deleteCat}