const axios = require('axios');

async function testCodeExecution() {
    const code = `print("Hello, World!")`; // Sample Python code
    const language = 'python';

    try {
        const response = await axios.post('http://localhost:5000/execute', { language, code });
        console.log('Execution Output:', response.data);
    } catch (error) {
        console.error('Error executing code:', error.response ? error.response.data : error.message);
    }
}

testCodeExecution();
