import mongoose from 'mongoose';
import formatDate from 'date-fns/format';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: { type: String, required: true },
  username: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
});

MessageSchema.virtual('date_created_formatted').get(function () {
  if (!this.date_created) return '';
  return formatDate(new Date(this.date_created), 'LLL dd, yyyy');
});

export default mongoose.model('Message', MessageSchema);
