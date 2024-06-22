const Order  = require('../models/Order');

export const createOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
            user: req.user._id
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error});
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

