import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  dateTime: Date,
  purchaseAmount: String
});

const Purchase = model('Purchase', purchaseSchema);
export default Purchase;
