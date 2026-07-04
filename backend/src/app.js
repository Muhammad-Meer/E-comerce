const express = require('express');
const authRouter = require("./routers/auth.router");



const app = express();
app.use(express.json())

app.use("/api/auth", authRouter);
app.use('/api/auth', require('./routers/authRoutes'));
app.use('/api/products', require('./routers/productRoutes'));
app.use('/api/orders', require('./routers/orderRoutes'));
app.use('/api/payment', require('./routers/paymentRoutes'));
app.use('/api/analytics', require('./routers/analyticsRoutes'));




module.exports = app;