import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedpassword: { type: String, required: true },
  id: { type: String },
});

var userData = mongoose.model('User', userSchema);

export default userData;
