const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// 添加管理员
router.post('/', adminController.createAdmin);

// 获取管理员列表
router.get('/', adminController.getAdmins);

// 获取单个管理员
router.get('/:id', adminController.getAdmin);

// 更新管理员
router.put('/:id', adminController.updateAdmin);

// 删除管理员
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;