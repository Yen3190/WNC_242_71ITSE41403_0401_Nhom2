const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');
const { response } = require('express');
const multer = require('multer');
const path = require('path');
const emailRegex = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,3})+$/;

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword} = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ status: "ERROR", message: "All fields are required" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: "ERROR", message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ status: "ERROR", message: "Password must be at least 6 characters" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: "ERROR", message: "Passwords do not match" });
        }

        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ status: "ERROR", message: "Email already exists" });
        }

        const response = await UserService.createUser({ name, email, password});

        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "ERROR", message: "Email and password are required" });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ status: "ERROR", message: "Invalid email format" });
        }

        const response = await UserService.loginUser(req.body);  // Gọi đến UserService
        const { refresh_token} = response;

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            //secure: false,
            secure: process.env.NODE_ENV === 'production',
            samesite: 'strict'
        });

        return res.status(200).json(response);  // Trả lại thông tin thành công
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage, 
    limits: { fileSize: 10 * 1024 * 1024 },  // Giới hạn kích thước file (10MB)
    fileFilter: (req, file, cb) => {
        // Chỉ cho phép các file ảnh
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
    }
});


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ status: "ERROR", message: "User ID is required" });
        }


        upload.single('avatar')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ status: "ERROR", message: "File upload failed: " + err.message });
            }


            const updateData = req.body;


            if (req.file) {
                updateData.avatar = {
                    data: req.file.buffer, 
                    contentType: req.file.mimetype  
                };
            }


            const response = await UserService.updateUser(userId, updateData);

            return res.status(200).json(response);
        });
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ status: "ERROR", message: "User ID is required" });
        }

        const response = await UserService.deleteUser(userId);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ status: "ERROR", message: "User ID is required" });
        }

        const response = await UserService.getDetailsUser(userId);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};



const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ status: "ERROR", message: "No refresh token found" });
        }

        const response = await JwtService.refreshTokenJwtService(refreshToken);
        if (response.status === "OK") {
            return res.status(200).json(response); 
        } else {
            return res.status(401).json({ status: "ERROR", message: "Invalid refresh token" });
        }
    } catch (error) {
        return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh-token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
       
    } catch (e) {
        return res.status(404).json({
            message:e
        });
    }
};

module.exports = { 
    createUser, 
    loginUser, 
    updateUser, 
    deleteUser, 
    getAllUser, 
    getDetailsUser, 
    refreshToken,
    logoutUser
};
