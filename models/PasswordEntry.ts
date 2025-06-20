import mongoose from 'mongoose';

const PasswordEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  website: String,
  username: String,
  password: String, // encrypted
  note: String,
});

export default mongoose.models.PasswordEntry ||
  mongoose.model('PasswordEntry', PasswordEntrySchema);
