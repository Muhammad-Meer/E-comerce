const Order = require("../models/orderModel");
const sendEmail = require("../utils/sendEmail");

// ================= Create Order =================
const createOrder = async (req, res) => {
  try {
    const { item, totalAmount, address, paymentId } = req.body;

    if (!item || item.length === 0 || !totalAmount || !address) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    const order = await Order.create({
      user: req.user._id,
      item,
      totalAmount,
      address,
      paymentId,
    });

    const message = `
Dear ${req.user.name},

Your order has been created successfully.

Order ID: ${order._id}
Total Amount: $${totalAmount}
Address: ${address}

Thank you for shopping with us.
`;

    await sendEmail(
      req.user.email,
      "Order Created Successfully",
      message
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Orders (Admin) =================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Logged-in User Orders =================
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Order By ID =================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Order Status =================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status || order.status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
};