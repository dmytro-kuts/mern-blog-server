import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
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
        userAvatar: user.avatarUrl,
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
      userAvatar: user.avatarUrl,
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

    res.json(newPostWithoutImage);
  } catch (error) {
    res.json({
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
    res.json({
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
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      }),
    );

    res.json(list);
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      let imgFileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', imgFileName));
      post.imgUrl = imgFileName || '';
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Failed to update article',
    });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.json({ message: 'Post does not exist' });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({
      _id: post._id,
      message: 'The post has been deleted',
    });
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Post Comments
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      }),
    );

    res.json(list);
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};
