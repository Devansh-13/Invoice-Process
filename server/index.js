// Import necessary libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = require('./app');
const { sequelize } = require('./database'); // Assuming you've exported the Sequelize instance from a file named 'database.js'

dotenv.config();

// Sync Sequelize models with the database
sequelize.sync().then(() => {
    console.log('Database synced successfully');
}).catch(err => {
    console.error('Database sync failed:', err);
    process.exit(1); // Exit the process if syncing fails
});

// Start the server
const PORT = 1400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
