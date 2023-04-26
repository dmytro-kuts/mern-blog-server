import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { postId, comment, userName, userAvatar } = req.body;

    if (!comment) {
      return res.json({ message: 'Сomment cannot be empty' });
    }

    const newComment = new Comment({ comment, userName, userAvatar });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.json({ message: 'Comment does not exist' });
    }

    await Post.findOneAndUpdate(
      { comments: commentId },
      {
        $pull: { comments: commentId },
      },
    );

    res.json({
      _id: comment._id,
      message: 'Comment has been deleted',
    });
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};
