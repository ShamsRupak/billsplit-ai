import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    avatar: {
      type: String,
      default: 'https://default.avatar/url', // TODO: Update with default avatar URL
    },
    bio: {
      type: String,
      maxlength: 160,
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    groups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    }],
    settings: {
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password if it's new or changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to verify password
userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Indexes
userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);

export default User;

