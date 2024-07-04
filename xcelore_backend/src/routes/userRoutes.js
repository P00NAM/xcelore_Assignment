
const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', isAdmin, createUser);
router.get('/', isAdmin, getUsers);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
