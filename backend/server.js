require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const authRouter = require("./src/routers/auth.router");

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRouter);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});