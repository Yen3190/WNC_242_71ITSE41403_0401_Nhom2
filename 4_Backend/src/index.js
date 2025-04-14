
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json({ limit: '50mb' }));  // Giới hạn dung lượng cho JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Giới hạn dung lượng cho URL encoded
app.use(cookieParser());  // Middleware cho cookies


// app.use(cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",  // Đảm bảo rằng CLIENT_URL trong .env đã được cấu hình đúng
//     credentials: true
// }));
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.sendStatus(204);
    }
    next();
  });
  
routes(app);

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log("Connect to DB success!");
    })
    .catch((err) => {
        console.log("Error connecting to DB:", err);
    });

// Khởi chạy server
app.listen(port, () => {
    console.log("Server is running on port:", port);
});
