const mongoose = require('mongoose');

// Load the database connection and Trip model
require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

// Delete existing records and insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Seed the database, close the connection, and exit
seedDB()
    .then(async () => {
        console.log('Trips successfully loaded into MongoDB');
        await mongoose.connection.close();
        process.exit(0);
    })
    .catch(async (err) => {
        console.error('Error loading trips:', err);
        await mongoose.connection.close();
        process.exit(1);
    });