const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

let users = []; // In-memory user store

// POST /register
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
});

module.exports = router;