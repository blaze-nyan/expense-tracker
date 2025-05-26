import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please enter amount"],
    min: 0,
  },
  date: Date,
  category: {
    type: String,
    required: [true, "Please choose category"],
  },
  paymentmethod: {
    type: String,
    required: [true, "Please choose payment method"],
  },
  note: String,
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

expenseSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});
const Expense =
  mongoose.models.expenses || mongoose.model("expenses", expenseSchema);
export default Expense;
