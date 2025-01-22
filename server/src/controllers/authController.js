const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({
            success: false,
            error: 'User not found'
        });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({
            success: false,
            error: 'Invalid credentials'
        });

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            data: token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: `Server error: ${err.message}`
        });
    }
}

module.exports = { login }