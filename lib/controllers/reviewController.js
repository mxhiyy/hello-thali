const Review = require('@/lib/models/Review');


const createReview  = async ( req, res) => {
    try {
        const { name, review }  = req.body;
        const newReview = new Review({
            name, 
            review, 
            userId: req.user._id
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.log('Error saving review', error);
        res.status(500).json({ message: 'Error saving review', error });
    }
};

const fetchReview = async (req, res) => {
    try{
        const reviews = await Review.find();
        res.status(200).json(reviews);
    }catch(error){
        console.error('Error fetching reviews:', error);a
        res.status(500).json({ message: 'Error fetching ratings', error});
    }
}

module.exports = { createReview, fetchReview };

