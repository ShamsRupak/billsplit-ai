import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    category: {
      type: String,
      enum: ['food', 'transport', 'accommodation', 'entertainment', 'utilities', 'shopping', 'other'],
      default: 'other',
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    participants: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    }],
    splitType: {
      type: String,
      enum: ['equal', 'percentage', 'exact', 'shares'],
      default: 'equal',
    },
    receipt: {
      url: String,
      filename: String,
      mimetype: String,
      size: Number,
      aiParsed: {
        type: Boolean,
        default: false,
      },
      parsedData: {
        vendor: String,
        date: Date,
        items: [{
          name: String,
          price: Number,
          quantity: Number,
        }],
        tax: Number,
        tip: Number,
        total: Number,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isSettled: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    location: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total amount from participants before saving
expenseSchema.pre('save', function (next) {
  if (this.participants && this.participants.length > 0) {
    const total = this.participants.reduce((sum, participant) => sum + participant.amount, 0);
    // Allow small rounding differences
    if (Math.abs(total - this.amount) > 0.01) {
      return next(new Error('Participant amounts must sum to total expense amount'));
    }
  }
  next();
});

// Indexes
expenseSchema.index({ group: 1, date: -1 });
expenseSchema.index({ paidBy: 1 });
expenseSchema.index({ 'participants.user': 1 });

export const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
