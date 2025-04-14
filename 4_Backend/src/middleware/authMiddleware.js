const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    // Lấy token từ header Authorization (Bearer token)
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication token is missing",
            status: "ERROR"
        });
    }

    // Giải mã token và kiểm tra
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: "Authentication failed: Invalid or expired token",
                status: "ERROR"
            });
        }

        // Kiểm tra nếu payload không có thông tin cần thiết
        if (!decoded || typeof decoded.isAdmin === 'undefined') {
            return res.status(401).json({
                message: "Invalid token: Missing user information",
                status: "ERROR"
            });
        }

        // Kiểm tra quyền admin
        if (decoded.isAdmin) {
            next(); // Cho phép tiếp tục nếu là admin
        } else {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to access this resource",
                status: "ERROR"
            });
        }
    });

};

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: "Authentication token is missing",
            status: "ERROR"
        });
    }

    // Giải mã token và kiểm tra
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                message: "Authentication failed: Invalid or expired token",
                status: "ERROR"
            });
        }

        // Kiểm tra nếu payload không có thông tin người dùng
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token: Missing user information",
                status: "ERROR"
            });
        }

        req.user = decoded; // Lưu thông tin người dùng vào req.user
        next(); // Cho phép tiếp tục nếu là người dùng hợp lệ
    });
};
module.exports = {
    authMiddleWare,
    authUserMiddleWare
};
