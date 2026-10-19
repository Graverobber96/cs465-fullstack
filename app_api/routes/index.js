
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Authentication required.'
    });
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token.'
    });
  }
};

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router.post('/register', requireAuth, authController.register);
router.post('/login', authController.login);

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET one trip by its code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// PUT - Update an existing trip (protected)
router.put('/trips/:tripCode', requireAuth, tripsController.tripsUpdateTrip);

// POST - Add a new trip (protected)
router.post('/trips', requireAuth, tripsController.tripsAddTrip);

// DELETE - Remove an existing trip (protected)
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

module.exports = router;
