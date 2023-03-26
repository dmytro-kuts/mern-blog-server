import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

// Register
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const isUsed = await User.findOne({ userName, email });

    if (isUsed) {
      return res.json({
        message: 'This name or email is already taken',
      });
    }

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      userName,
      email,
      avatarUrl,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      },
    );

    await newUser.save();

    res.json({
      token,
      newUser,
      message: 'Registration was successful',
    });
  } catch (error) {
    res.json({
      message: 'Failed to register',
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({
        message: 'User not found',
      });
    }
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.json({
        message: 'Invalid login or password',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      },
    );

    res.json({
      token,
      user,
      message: 'You are logged in',
    });
  } catch (error) {
    res.json({
      message: 'Login failed',
    });
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: 'User not found',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      },
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.json({
      message: 'No access',
    });
  }
};
