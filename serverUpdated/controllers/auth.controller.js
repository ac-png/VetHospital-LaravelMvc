const User = require('../models/user.model');
const Role = require('../models/role.model');

exports.register = async (req, res) => {
const { username, email, password, role } = req.body;

try {
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
    return res.status(400).json({ message: 'Role not found' });
    }

    const newUser = new User({ username, email, password, role: userRole._id });
    await newUser.save();

    const token = newUser.generateAuthToken();

    res.status(201).json({ user: newUser, token });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = user.generateAuthToken();

        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
