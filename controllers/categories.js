const Category = require("../models/Category");

const save = async (req,res) => {
    const newCat = new Category(req.body);
    try {
        if (!req.params.token) {
            res.status(401).json("Not login.")
            return 
        }
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

module.exports = {find, save}