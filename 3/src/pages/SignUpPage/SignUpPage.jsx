import React, { useState } from 'react';
import { Image, Spin } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import imageLogo from '../../assets/images/login.jpg';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from "../../components/Message/Message"
const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State lưu lỗi

  const navigate = useNavigate();

  const mutation = useMutationHook(UserService.signupUser, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      if (data.status === "ERROR") {
        
        setErrors({ email: data.message });
      } else {
       
        navigate('/sign-in');
      }
    },
    onError: (error) => {
      setErrors({ server: error.message || 'Sign up failed. Please try again.' });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSignUp = () => {
    let validationErrors = {};

    if (!name) validationErrors.name = 'Full name is required!';
    if (!email) validationErrors.email = 'Email is required!';
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validationErrors.email = 'Invalid email format!';
    }
    if (!password) validationErrors.password = 'Password is required!';
    if (!confirmPassword) validationErrors.confirmPassword = 'Please confirm your password!';
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match!';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    mutation.mutate({ name, email, password, confirmPassword });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.53)',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '800px',
          height: '500px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex',
        }}
      >
        <WrapperContainerLeft>
          <h1>Hi Darling</h1>
          <p>Login or Register</p>

          {/* Input Name */}
          <InputForm
            style={{ marginBottom: '5px' }}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>}

          {/* Input Email */}
          <InputForm
            style={{ marginBottom: '5px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>}

          {/* Input Password */}
          <div style={{ position: 'relative', marginBottom: '5px' }}>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>}

          {/* Input Confirm Password */}
          <div style={{ position: 'relative', marginBottom: '5px' }}>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          {errors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</p>}

          {/* Hiển thị lỗi server */}
          {errors.server && <p style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>{errors.server}</p>}

          {/* Button Sign Up */}
          <ButtonComponent
            disabled={isLoading}
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: '#e76f8b',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px',
            }}
            textButton={isLoading ? <Spin size="small" style={{ color: '#fff' }} /> : 'Sign up'}
            styleTextButton={{ color: '#fff', fontSize: '20px', fontWeight: 'bolder' }}
          />

          {/* Chuyển sang trang đăng nhập */}
          <p style={{ fontSize: '13px' }}>
            You have an account?{' '}
            <WrapperTextLight onClick={() => navigate('/sign-in')}>Log in</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="Logo Login"
            height="260px"
            width="260px"
            style={{ borderRadius: '50%' }}
          />
          <h4 style={{ color: '#85b247', fontSize: '16px', fontWeight: 'bolder' }}>
            Welcome to our Flowers Garden
          </h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
