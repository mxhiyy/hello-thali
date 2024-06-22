const mongoose =  require("mongoose");

const UserProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
});

module.exports = mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);
