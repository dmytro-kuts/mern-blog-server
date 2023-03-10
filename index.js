import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5555;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middlewere
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoute);

async function start() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose
      .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bsj0gto.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        { useNewUrlParser: true },
      )
      .then(() => console.log('DB ok'))
      .catch((err) => console.log('DB error', err));

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    return console.log(err);
  }
}
start();
