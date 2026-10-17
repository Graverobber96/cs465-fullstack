const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET one trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
// UPDATE an existing trip
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
// POST a new trip
router.post('/trips', tripsController.tripsAddTrip);

// PUT /api/trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(400).json({
      message: 'Error updating trip',
      error: err.message
    });
  }
};

module.exports = router;