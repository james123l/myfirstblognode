const Admin = require('../models/Admin');

// 增加管理员
const createAdmin = async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json({ admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 获取管理员列表
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json({ admins });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 获取单个管理员
const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 更新管理员
const updateAdmin = async (req, res) => {
    try {
        console.log(req.params.id);
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 删除管理员
const deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createAdmin,
    getAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
};