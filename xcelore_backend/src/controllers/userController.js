const User = require('../models/User');

const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'Admin' } });
        res.json(users);
    } catch (error) {
        res.status(400).send('Error fetching users');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).send('Error updating user');
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.send('User deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting user');
    }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
