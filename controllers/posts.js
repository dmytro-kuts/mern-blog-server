import User from '../models/User.js';
import Post from '../models/Post.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let imgFileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', imgFileName));

      const newPostWithImage = new Post({
        userName: user.userName,
        title,
        text,
        imgUrl: imgFileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      userName: user.userName,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    return res.json(newPostWithoutImage);
  } catch (error) {
    res.status(500).json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Get All Post
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({ message: 'There are no posts' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Get post by id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: 'Oops.....something went wrong',
    });
  }
};
