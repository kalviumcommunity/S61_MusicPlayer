const express = require('express');
const app = express();
const PORT = 4000;

// Route for the root endpoint
app.get('/', (req, res) => {
  res.send(' ASAP Project - Endpoint!');
});

// Route for the /ping endpoint
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
