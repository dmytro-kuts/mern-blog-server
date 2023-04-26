import express from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import commentRoute from './routes/comments.js';
import likeRoute from './routes/likes.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5555;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middlewere
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/likes', likeRoute);

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
  } catch (error) {
    return console.log(error);
  }
}
start();
