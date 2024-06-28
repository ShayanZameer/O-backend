const User = require("../models/User");

const {validationResult }= require ("express-validator");


exports.addToCart = async (req, res) => {
    const { medicine_id, quantity } = req.body;

    if (!medicine_id || !quantity) {
        return res.status(400).json({ message: 'Medicine ID and quantity are required' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const existingItem = user.cart.find(item => item.medicine_id.toString() === medicine_id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ medicine_id, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Medicine added to cart successfully', cart: user.cart });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send('Server error');
    }
};


exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.medicine_id', 'medicineName description');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send('Server error');
    }
};


exports.removeFromCart = async (req, res) => {
    const { medicine_id } = req.params;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItemIndex = user.cart.findIndex(item => item.medicine_id.toString() === medicine_id);

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Medicine not found in cart' });
        }

        user.cart.splice(cartItemIndex, 1);
        await user.save();

        res.status(200).json({ message: 'Medicine removed from cart successfully', cart: user.cart });
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send('Server error');
    }
};