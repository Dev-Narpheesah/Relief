const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserInfo = require('../models/UserInfoModel');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await UserInfo.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserInfo.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ result, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserInfo.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserInfo.find().sort("-createdAt");
        res.status(200).json(users);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Something went wrong!" });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };
