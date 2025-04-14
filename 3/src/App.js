import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { routes } from './routes';
import * as UserService from './services/UserService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, updateUser } from './redux/slides/userSlide';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.user);
  

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id && storageData) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []); // Chỉ chạy khi component mount

  // Interceptor để tự động thêm token vào header Authorization: Bearer <token>
  UserService.axiosJWT.interceptors.request.use(async(config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded();
    const storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken = jwtDecode(refreshToken)

    if(decoded?.exp < currentTime.getTime()/1000){
      const data = await UserService.refreshToken(refreshToken)
      config.headers['Authorization'] = `Bearer ${data?.access_token}`;
    }else{
      dispatch(resetUser())
    }
    // if (decoded?.id) {
    //   const token = localStorage.getItem('access_token'); // Lấy token từ localStorage
    //   if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header Authorization
    //   } else {
    //     console.error('Authentication token is missing');
    //   }
    // }

    return config;
  }, (err) => {
    return Promise.reject(err);
  });

  const handleGetDetailsUser = async (id, token) => {
    console.log('Access Token:', token);
    let storageRefreshToken = localStorage.getItem('refresh_token') 
    const refreshToken = JSON.parse(storageRefreshToken)// Kiểm tra token trước khi gửi yêu cầu
    try {
      const res = await UserService.getDetailsUser(id, token);
      console.log('User Details:', res); // Kiểm tra kết quả từ API
      dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}));
    } catch (error) {
      console.error('Error fetching user details:', error); // Xử lý lỗi
    }
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token'); // Lấy token từ localStorage
    let decoded = {};
    if (storageData) {
      try {
        decoded = jwtDecode(storageData); // Giải mã token
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return { decoded, storageData };
  };
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element: Page, isShowHeader, isPrivate }) => {
          // Kiểm tra quyền truy cập vào route nếu có yêu cầu isPrivate
          const ischeckAuth = !isPrivate || user.isAdmin;

          // Nếu route là private và người dùng không phải admin, chuyển hướng về trang chủ
          if (isPrivate && !user.isAdmin) {
            return <Route key={path} path={path} element={<navigate to="/" />} />;
          }

          return (
            <Route
              key={path}
              path={path}
              element={
                isShowHeader ? (
                  <DefaultComponent>
                    <Page />
                  </DefaultComponent>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );

}

export default App;
