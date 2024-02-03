const express = require('express')
const router = express.Router();
const cors = require('cors')
const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/api', async function(req, res) {
    res.json({ "users": ["user"] })
})

const PORT = 5050;

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })