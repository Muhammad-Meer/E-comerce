const createdOrder = async (req, res) => {
    try {
        // Your order creation logic goes here (e.g., saving to a database)
        const order = {
            message: "Order created successfully",
            data: req.body
        };
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createdOrder };
