const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

// Register a new user
const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email.trim().toLowerCase();
    user.setPassword(req.body.password);

    await user.save();

    return res.status(201).json({
      token: user.generateJwt()
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Unable to register with these details.'
      });
    }

    console.error('Registration error:', err);
    return res.status(500).json({
      message: 'Registration failed.'
    });
  }
};

// Log in an existing user
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: 'Authentication error.'
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Incorrect email or password.'
      });
    }

    return res.status(200).json({
      token: user.generateJwt()
    });
  })(req, res);
};

module.exports = {
  register,
  login
};