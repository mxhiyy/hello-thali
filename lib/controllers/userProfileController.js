import UserProfile from "../models/UserProfile";

export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ user: req.user._id });
    if (!userProfile) {
      res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userProfile = await UserProfile.findOneAndUpdate(
      {
        user: req.user._id,
      },
      { firstName, lastName, email },
      { new: true, upsert: true }
    );
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
