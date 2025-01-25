import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  photoUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

export default Post;