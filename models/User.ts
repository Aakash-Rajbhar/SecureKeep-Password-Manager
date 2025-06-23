import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  resetToken: { type: String },
  resetTokenExpiry: { type: Number },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
