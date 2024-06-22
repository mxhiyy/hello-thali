import UserProfile from "../models/UserProfile";

export const getUserProfile = async (req, res) => {
  try {
    console.log("Request User ID: ", req.user._id);
    const userProfile = await UserProfile.findOne({ user: req.user._id });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error("Get UserProfile Error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    console.log("Updating Profile for User ID: ", req.user._id);

    if (!req.user._id) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      { firstName, lastName, email },
      { new: true, upsert: true }
    );
    return res.status(200).json(userProfile);
  } catch (error) {
    console.error("Update UserProfile Error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
