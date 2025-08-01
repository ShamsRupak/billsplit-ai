import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    category: {
      type: String,
      enum: ['trip', 'home', 'couple', 'friends', 'other'],
      default: 'other',
    },
    avatar: {
      type: String,
      default: 'https://default.group-avatar/url',
    },
    members: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    expenses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    }],
    totalExpenses: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    inviteCode: {
      type: String,
      unique: true,
    },
    settings: {
      allowMembersToAddExpenses: {
        type: Boolean,
        default: true,
      },
      simplifyDebts: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique invite code before saving
groupSchema.pre('save', function (next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
  next();
});

// Indexes
groupSchema.index({ inviteCode: 1 });
groupSchema.index({ 'members.user': 1 });

export const Group = mongoose.model('Group', groupSchema);
export default Group;
