import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [1, "Min income must me one"],
  },
  source: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});
const Income =
  mongoose.models.incomes || mongoose.model("incomes", incomeSchema);
export default Income;
