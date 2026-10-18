
const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET one trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// PUT - Update an existing trip
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

// POST - Add a new trip
router.post('/trips', tripsController.tripsAddTrip);

// DELETE - Remove an existing trip
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
