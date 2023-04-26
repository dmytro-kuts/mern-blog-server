import Post from '../models/Post.js';
import Like from '../models/Like.js';

// Create Like
export const createLike = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    const likes = await Promise.all(
      post.likes.map((like) => {
        return Like.findById(like);
      }),
    );

    const isLiked = likes.find((el) => el.userId === req.userId);

    if (isLiked) {
      return res.json({
        success: false,
      });
    }

    const newLike = new Like({
      userId,
      postId,
    });

    await newLike.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { likes: newLike._id },
    });
    const postLikes = await Post.findById(postId);

    res.json({
      success: true,
      likes: postLikes.likes.length
    });
  } catch (error) {
    res.json({
      message: 'Oops.....something went wrong',
    });
  }
};
