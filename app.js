// app.js

const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Use movie routes
app.use('/api', movieRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
