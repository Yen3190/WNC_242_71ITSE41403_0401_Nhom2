const OrderService = require('../services/OrderService');


const createOrder = async (req, res) => {
    try {
        console.log('req.body', req.body);

        const {
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            fullName,
            address,
            city,
            phone,
            orderItems
        } = req.body;

        // Ưu tiên kiểm tra orderItems trước
        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({
                status: "ERROR",
                message: "orderItems is required and must be a non-empty array"
            });
        }

        // Sau đó kiểm tra các trường còn lại
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(400).json({
                status: "ERROR",
                message: "The input is required"
            });
        }

        const response = await OrderService.createOrder(req.body);

        return res.status(200).json(response);
    } catch (e) {
        console.error("Create Order Error:", e);
        return res.status(500).json({
            status: "ERROR",
            message: "Internal Server Error"
        });
    }
};



module.exports = { 
    createOrder


};
