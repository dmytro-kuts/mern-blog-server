import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    userName: { type: String },
    comment: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true },
);

export default mongoose.model('Comment', CommentSchema);
