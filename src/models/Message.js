import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    text: {
      type: String,
      minlength: [1, 'Text needs to be longer'],
      maxlength: [500, 'Text cannot exceed 500 characters'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    coin: String,
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Message', MessageSchema);
