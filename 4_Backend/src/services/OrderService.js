const Order = require("../models/OrderProduct");
const bcrypt = require("bcrypt");



const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        console.log("newOrder", newOrder)
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;
        try {
          

            const createdOrder = await Order.create({
                orderItems,
                shippingAddress:{
                    fullName,
                    address,
                    city,
                    phone
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user,
            });

            if (createdOrder) {
                return resolve({
                    status: 'OK',
                    message: 'ORDER CREATED SUCCESSFULLY',
                    data: createdOrder
                });
            }
            console.log('createdOrder', createdOrder)

            return resolve({
                status: 'ERROR',
                message: 'Order creation failed',
            });

        } catch (e) {
            console.log("e", e)
            return reject(e);
        }
    });
};


module.exports = {
    createOrder
};
