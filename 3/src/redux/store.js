

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide';
import userReducer from './slides/userSlide';
import orderReducer from './slides/orderSlide';

// Load order state từ localStorage
const loadOrderState = () => {
  try {
    const serializedState = localStorage.getItem('orderState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Lỗi khi load order từ localStorage:', err);
    return undefined;
  }
};

// Save order state vào localStorage
const saveOrderState = (state) => {
  try {
    const serializedState = JSON.stringify(state.order);
    localStorage.setItem('orderState', serializedState);
  } catch (err) {
    console.error('Lỗi khi save order vào localStorage:', err);
  }
};

// Gọi load để lấy initial order state
const preloadedState = {
  order: loadOrderState(),
};

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
  },
  preloadedState, // <-- sử dụng giá trị đã load
});

// Lưu order state mỗi khi thay đổi
store.subscribe(() => {
  saveOrderState(store.getState());
});
