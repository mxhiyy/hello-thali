import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
