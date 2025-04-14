// src/pages/OrderPage/style.js
import { InputNumber } from "antd";
import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WrapperValue = styled.div`
  background: #FFDBE7;
  border: 1px solid rgb(255, 194, 244);
  padding: 10px;
  width: fit-content;
  border-radius: 6x;
  margin-top: 4px;
`

export const WrapperSection = styled.div`
  margin-bottom: 32px;
  width: fit-content;
  padding: 16px;
  border: 2px solid #f9b5c3; /* Border màu hồng */
  border-radius: 12px;
  background-color: #fff0f5;
  box-shadow: 0 2px 8px rgba(233, 94, 137, 0.1);
  transition: all 0.3s ease-in-out;
  animation: ${fadeUp} 0.4s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(233, 94, 137, 0.2);
    border-color: #e76f8b;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    color: #e76f8b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .ant-radio-wrapper {
      padding: 10px 14px;
      border: 1px solid #e6e6e6;
      border-radius: 8px;
      background-color: #fff;
      transition: all 0.3s ease;

      &:hover {
        border-color: #e76f8b;
        background-color: #fff8f9;
        box-shadow: 0 2px 6px rgba(231, 111, 139, 0.15);
      }

      .ant-radio-checked .ant-radio-inner {
        border-color: #e76f8b;
        background-color: #e76f8b;
      }
    }
  }
`;

export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 60px;
        border-top:  none;
        border-bottom: none;
    &.ant-input-number-handler-wrap{
        display: none;
    }
    }
    
`
export const WrapperLeft = styled.div`
  flex: 3;
  width: fit-content;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
`;

export const WrapperStyleHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 2px solid #e6e6e6;
  font-weight: 600;
  font-size: 15px;
  color: #2c2c2c;

  span {
    &:first-child {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  svg {
    font-size: 18px;
    color: #ff4d4f;
  }
`;

// export const WrapperListOrder = styled.div`
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;
export const WrapperListOrder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 10px 0;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding-left: 12px;
  }
`;

export const WrapperInfo = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  gap: 12px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
  }

  .product-name {
    font-size: 14px;
    font-weight: 500;
    color: #1c1c1c;
  }
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    border: 1px solid #d9d9d9;
    background: #fff;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: #f0f0f0;
      border-color: #1890ff;
    }

    svg {
      font-size: 14px;
      color: #333;
    }
  }

  input {
    width: 50px;
    text-align: center;
  }
`;

export const WrapperPriceDiscount = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #b0b0b0;
  text-decoration: line-through;
`;

export const WrapperRight = styled.div`
  flex: 1;
  margin-left: 24px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  height: fit-content;
`;

export const WrapperSummaryInfo = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #ececec;
  padding-bottom: 20px;

  span {
    &:first-child {
      color: #666;
    }

    &:last-child {
      font-weight: bold;
    }
  }
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: bolder;
  font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
  color: gray;
  margin-bottom: 0;
`;
