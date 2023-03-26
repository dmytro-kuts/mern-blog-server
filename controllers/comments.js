import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { postId, comment, userName } = req.body;

    if (!comment) {
      return res.json({ message: 'Сomment cannot be empty' });
    }

    const newComment = new Comment({ comment, userName });
    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.json(newComment);
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};
