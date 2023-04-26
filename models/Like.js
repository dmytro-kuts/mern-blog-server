import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema(
  {
    userId: { type: String },
    postId: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model('Like', LikeSchema);
