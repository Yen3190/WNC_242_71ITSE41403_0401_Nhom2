// src/slides/orderSlide.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    wishlistItems: [],
    ShippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paiAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // addOrderProduct: (state, action) => {
        //     const { orderItems } = action.payload;
        //     const itemOrder = state.orderItems.find((item) => item.product === orderItems.product);
        //     if (itemOrder) {
        //         itemOrder.amount += orderItems.amount;
        //     } else {
        //         state.orderItems.push(orderItems);
        //     }
        // },
        addOrderProduct: (state, action) => {
            const { orderItems } = action.payload;
            const itemOrder = state.orderItems.find((item) => item.product === orderItems.product);
            if (itemOrder) {
                itemOrder.amount += orderItems.amount;
            } else {
                state.orderItems.push({ ...orderItems, checked: false }); // thêm checked
            }
        },
        toggleCheckProduct: (state, action) => {
            const { idProduct } = action.payload;
            const item = state.orderItems.find((item) => item.product === idProduct);
            if (item) {
                item.checked = !item.checked;
            }
        },
        toggleCheckAllProduct: (state, action) => {
            const { checked } = action.payload;
            state.orderItems.forEach(item => {
                item.checked = checked;
            });
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const item = state.orderItems.find((item) => item.product === idProduct);
            if (item) {
                item.amount += 1;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const item = state.orderItems.find((item) => item.product === idProduct);
            if (item && item.amount > 1) {
                item.amount -= 1;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(item => item.product !== idProduct);
        },
        updateAmount: (state, action) => {
            const { idProduct, amount } = action.payload;
            const item = state.orderItems.find((item) => item.product === idProduct);
            if (item && amount >= 1) {
                item.amount = amount;
            }
        },
        addToWishlist: (state, action) => {
            const item = action.payload;
            const existItem = state.wishlistItems.find(i => i.product === item.product);
            if (!existItem) {
                state.wishlistItems.push(item);
            }
        },
        removeFromWishlist: (state, action) => {
            const idProduct = action.payload;
            state.wishlistItems = state.wishlistItems.filter(item => item.product !== idProduct);
        },
        toggleWishlist: (state, action) => {
            const idProduct = action.payload;
            const index = state.wishlistItems.findIndex(item => item.product === idProduct);
            if (index !== -1) {
                state.wishlistItems.splice(index, 1); // remove
            } else {
                // cần thêm logic lấy sản phẩm nếu muốn tự thêm (nếu chưa có)
            }
        },


    }
});

export const {
    addOrderProduct,
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    updateAmount,
    toggleCheckProduct,
    toggleCheckAllProduct,
    removeFromWishlist,
    toggleWishlist,
    addToWishlist
} = orderSlice.actions;


export default orderSlice.reducer;
