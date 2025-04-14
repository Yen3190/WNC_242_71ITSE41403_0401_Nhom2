import { createSlice } from '@reduxjs/toolkit';
import { refreshToken } from '../../services/UserService';

const initialState = {
  name: '',
  email: '',
  access_token: '',
  address: '',
  phone: '',
  avatar: '',
  id: '',
  isAdmin: false,
  city:'',
  refreshToken:''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name = '', email = '', access_token = '', phone = '', avatar = '', address = '', _id = '', isAdmin, city='', refreshToken='' } = action.payload;
      state.name = name || '';
      state.email = email || '';
      state.phone = phone || '';
      state.address = address || '';
      state.avatar = avatar || '';
      state.id = _id;
      state.access_token = access_token || '';
      state.isAdmin = isAdmin;
      state.city=city;
      state.refreshToken = refreshToken;
    },

    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.access_token = '';
      state.address = '';
      state.avatar = '';
      state.id = '';
      state.phone = '';
      state.isAdmin = false;
      state.city = ''
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
