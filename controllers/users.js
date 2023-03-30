const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
    if (!req.params.token) {
        res.status(401).json("Not login.")
        return
    }
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        newpassword = await bcrypt.hash(req.body.password, salt);
        try {
            const original = await User.findById(req.body.userId);
            original.password = newpassword;
            await User.updateOne({ _id: req.body.userId }, original)
            res.status(200).json();
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}
const get = async (req, res) => {
    try {
        const user = await User.findById(req.params.token);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { get, update }