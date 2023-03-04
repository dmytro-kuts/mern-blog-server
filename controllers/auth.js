import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

// Registration
export const registration = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const isUsed = await User.findOne({ userName });

    if (isUsed) {
      return res.status(402).json({
        message: "Данне ім'я вже зайнято",
      });
    }

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      userName,
      password: hash,
    });

    await newUser.save();

    res.json({
      newUser,
      message: 'Реєстрація пройшла вдало',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Не вдалося зареєструватись',
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений ',
      });
    }
    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Невірний логін або пароль',
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
      message: 'Ви авторизувалися',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Не вдалося авторизуватися',
    });
  }
};

// Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Користувач не знайдений ',
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
      user
    });

  } catch (error) {
    res.status(500).json({
      message: 'Немає доступу',
    });
  }
};
