const ordermodels = require('../models/order.model');
const sendEmail = require('../utils/sendEmail');

const createOrder = async (req, res) => {
    try {
        const { item, totalAmount, address, paymentId } = req.body;

        // Validation
        if (!item || item.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        // Create and save a new order in your database
        const newOrder = new ordermodels({
            item,
            totalAmount,
            address,
            paymentId
        });

        await newOrder.save();

        // Optional: Send a confirmation email
        // await sendEmail(...);

        return res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getOrders = async (req, res) => {
    // Implement your logic here
};

const getOrderById = async (req, res) => {
    // Implement your logic here
};

const updateOrderStatus = async (req, res) => {
    // Implement your logic here
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
