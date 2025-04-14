import axios from "axios";
import Cookies from 'js-cookie';


export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosJWT.interceptors.request.use(async (config) => {
  const token = Cookies.get('access_token'); // Lấy token từ cookie
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
  } else {
    console.error("Authentication token is missing");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    // Lưu access_token vào cookie với thời gian hết hạn là 1 ngày
    Cookies.set('access_token', res.data.access_token, { expires: 1 });
    // Lưu refresh_token vào cookie với cờ HttpOnly (không thể truy cập từ JS)
    Cookies.set('refresh_token', res.data.refresh_token, { expires: 1, httpOnly: true });

    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};


export const signupUser = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Sign up failed");
  }
};


export const getDetailsUser = async (id) => {
  const token = Cookies.get('access_token'); // Lấy token từ cookie
  if (!token) {
    throw new Error("Cần có token truy cập");
  }
  try {
    const res = await axiosJWT.get(
      `/user/get-details/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      // Xử lý lỗi từ máy chủ (ví dụ 401, 500)
      if (error.response.status === 401 && error.response.data.message.includes("Invalid or expired token")) {
        // Nếu token hết hạn, gọi refresh token
        const refreshedToken = await refreshToken();
        return getDetailsUser(id); // Thử lại với token mới
      }
      throw new Error(`Lỗi từ máy chủ: ${error.response.data.message || 'Có lỗi xảy ra'}`);
    } else {
      throw new Error("Không có phản hồi từ máy chủ. Vui lòng thử lại sau.");
    }
  }
};


export const getAllUsers = async(access_token) => {
  const token = Cookies.get('access_token'); 
  if (!token) {
    throw new Error("Cần có token truy cập");
  }
  const res = await axiosJWT.get(
    `/user/getAll`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;

};


export const refreshToken = async () => {
  try {
    const refresh_token = Cookies.get('refresh_token'); // Lấy refresh token từ cookie
    if (!refresh_token) {
      throw new Error("Refresh token is missing");
    }

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
      { refresh_token }, // Gửi refresh token để lấy access token mới
      { withCredentials: true } // Đảm bảo gửi cookie nếu có
    );

    if (res.data?.access_token) {
      // Lưu lại access token mới vào cookie
      Cookies.set('access_token', res.data.access_token, { expires: 1 });
      return res.data.access_token; // Trả về access_token mới
    } else {
      throw new Error("Không nhận được access_token từ máy chủ");
    }
  } catch (error) {
    throw error.response?.data || new Error("Lỗi khi làm mới token");
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/log-out`);
    // Xóa token sau khi đăng xuất khỏi cookie
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    return res.data;
  } catch (error) {
    throw error.response?.data || new Error("Logout failed");
  }
};

export const updateUser = async (userId, userData) => {
  const token = Cookies.get('access_token'); // Lấy access token từ cookie
  if (!token) {
    throw new Error("Token xác thực bị thiếu");
  }

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL_BACKEND}/user/update-user/${userId}`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,  // Gửi access_token trong header
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Cập nhật thất bại');
  }
};

export const deleteUser = async (id) => {
  const token = Cookies.get('access_token'); // Lấy access token từ cookie
  if (!token) {
    throw new Error("Token xác thực bị thiếu");
  }
  const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/user/delete-user/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  console.log('res.data', res.data)
  return res.data

};

