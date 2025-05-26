import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Pls provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Pls provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Pls provide password"],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiryDate: Date,
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
