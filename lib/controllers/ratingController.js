const Rating = require("@/lib/models/Rating");

const AddRating = async (req, res) => {
  try {
    const { quality, affordability, convenience } = req.body;
    const rating = new Rating({
      quality,
      affordability,
      convenience,
      userId: req.user._id,
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    console.log('Error saving review', error);
    res.status(500).json({ message: "Error saving rating", error });
  }
};

const fetchRating = async (req, res) => {
  try{
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  }
  catch(error) {
    res.status(500).json({ message: 'Error fetching ratings', error });a
  }
}

module.exports ={ AddRating, fetchRating };
