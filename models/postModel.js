import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: {
    type: [String],
    trim: true,
  },
  selectedFile: String,
  likeCount: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
