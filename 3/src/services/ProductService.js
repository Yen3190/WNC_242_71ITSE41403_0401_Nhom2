import axios from "axios";
import { axiosJWT } from "./UserService";
import { data } from "react-router-dom";
import Cookies from 'js-cookie';


export const getAllProducts = async (search, limit, page) => {
  let res = {}
  if (search && search.length > 0) {

    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product?limit=${limit}&page=${page}&filter=name:${encodeURIComponent(search)}`
    );
  } else {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product?limit=${limit}&page=${page}`
    );
    //res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product?limit=${limit}`);
  }
  
  return res.data;

};

export const getAllProducts_2 = async ({ search = '', limit = 6, page = 0 }) => {
  let res = {};

  let url = `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll-product?limit=${limit}&page=${page}`;
  if (search && search.length > 0) {
    url += `&filter=name:${encodeURIComponent(search)}`;
  }

  res = await axios.get(url);
  return res.data;
};

export const createProduct = async (data) => {

  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/product/create`, data);
  return res.data;

};

export const getDetailsProduct = async (id) => {

  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/product/get-details/${id}`);
  console.log('res.data', res.data)
  return res.data

};


export const updateProduct = async (id, data) => {
  const token = Cookies.get('access_token'); // Lấy access token từ cookie
  if (!token) {
    throw new Error("Token xác thực bị thiếu");
  }

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL_BACKEND}/product/update/${id}`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Cập nhật thất bại');
  }
};

export const deleteProduct = async (id) => {
  const token = Cookies.get('access_token'); // Lấy access token từ cookie
  if (!token) {
    throw new Error("Token xác thực bị thiếu");
  }
  const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/product/delete-product/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log('res.data', res.data)
  return res.data

};

const ProductService = {
  getAllProducts,
  getDetailsProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts_2
};

export default ProductService;