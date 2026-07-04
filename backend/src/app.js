const express = require('express');

// Routers Import
const authRouter = require("./routers/auth.router");        // agar yeh file hai to

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);           // ← sirf ek baar
app.use('/api/products', require('./routers/productRoutes'));
app.use('/api/orders', require('./routers/orderRoutes'));
app.use('/api/payment', require('./routers/paymentRoutes'));
app.use('/api/analytics', require('./routers/analyticsRoutes'));

module.exports = app;