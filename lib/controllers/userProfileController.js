const UserProfile = require("../models/UserProfile");

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Get UserProfile Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { user: userId, firstName, lastName, email },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Update UserProfile Error: ", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate key error" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
