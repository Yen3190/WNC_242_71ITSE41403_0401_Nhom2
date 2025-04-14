import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image, message, Spin } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/login.jpg';
import { useMutationHook } from '../../hooks/useMutationHook';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const mutation = useMutationHook(UserService.loginUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      message.success('Đăng nhập thành công!');
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      navigate('/');

      if (data?.access_token && data?.user) {
        dispatch(updateUser({
          name: data.user.name,
          email: data.user.email,
          access_token: data.access_token
        }));
      }
    },
    onError: (error) => {
      message.error(error.message || 'Login failed. Please try again.');
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (mutation.isSuccess && mutation.data) {
      const { data } = mutation;
      if(location?.state){
        navigate(location?.state)
      }else{
        navigate('/');
      }

      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [mutation.isSuccess, mutation.data]); // Chỉ gọi lại khi mutation thành công

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleSignIn = () => {
    if (!email || !password) {
      message.warning('Please enter email and password!');
      return;
    }
    mutation.mutate({ email, password });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Welcome Back!</h1>
          <p>Login or Register</p>

          <InputForm id="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div style={{ position: 'relative', marginTop: '10px' }}>
            <InputForm
              id="password"
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{ position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)', cursor: 'pointer' }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>

          {mutation?.data?.status === "ERROR" && <span style={{ color: "red" }}>{mutation?.data?.message}</span>}

          {/* Nút Sign In với Loading */}
          <ButtonComponent
            onClick={handleSignIn}
            disabled={isLoading || !email || !password}
            size={40}
            styleButton={{
              background: '#e76f8b',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            textButton={
              isLoading ? <Spin size="small" style={{ color: '#fff' }} /> : 'Log in'
            }
            styleTextButton={{ color: '#fff', fontSize: '20px', fontWeight: 'bolder' }}
          />

          <p><WrapperTextLight>Forgot Password?</WrapperTextLight></p>
          <p style={{ fontSize: '13px' }}>
            No Account? <WrapperTextLight onClick={() => navigate('/sign-up')}>Create Account</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="Logo Login" height="260px" width="260px" style={{ borderRadius: '50%' }} />
          <h4 style={{ color: '#85b247', fontSize: '16px', fontWeight: 'bolder' }}>Welcome to our Flowers Garden</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
