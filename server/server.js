const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ALLOWED_ORIGINS.split(',')
}));
app.use(express.json())

// Routes
app.get('/api/users', async function(req, res) {
    try {
        const response = await fetch(process.env.USERS);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/api/user-data', async (req, res) => {
    try {
        const getUrl = req.body.getUrl;
        if (!getUrl) {
            throw new Error('Invalid user data')
        }
        const response = await fetch(getUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch user data')
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching user data:', error)
        res.status(500).json({ error: 'Failed to fetch user data' })
    }
})

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});