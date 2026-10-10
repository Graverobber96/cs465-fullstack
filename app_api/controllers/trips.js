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

module.exports = {
    tripsList,
    tripsFindByCode
};