import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    userAvatar: { type: String, default: '' },
    userName: { type: String },
    title: { type: String, required: true},
    text: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
  },
  { timestamps: true },
);

export default mongoose.model('Post', PostSchema);
