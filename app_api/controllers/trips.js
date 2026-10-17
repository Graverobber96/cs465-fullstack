const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips - Return all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trips',
            error: err.message
        });
    }
};

// GET /api/trips/:tripCode - Return one trip
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({
            code: req.params.tripCode
        }).exec();

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found'
            });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json({
            message: 'Error retrieving trip',
            error: err.message
        });
    }
};

 // POST /api/trips - Create a new trip
 const tripsAddTrip = async (req, res) => {
   try {
     const newTrip = await Trip.create(req.body);
     return res.status(201).json(newTrip);
   } catch (err) {
     return res.status(400).json({
       message: 'Error creating trip',
       error: err.message
     });
   }
 };

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
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
