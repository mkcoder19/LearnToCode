const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DockerService = require('./services/dockerService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Code execution endpoint
app.post('/execute', async (req, res) => {
    try {
        const { language, code } = req.body;
        
        if (!language || !code) {
            return res.status(400).json({ error: 'Language and code are required' });
        }

        const result = await DockerService.executeCode(language, code);
        
        if (result.success) {
            res.json({ output: result.output });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
