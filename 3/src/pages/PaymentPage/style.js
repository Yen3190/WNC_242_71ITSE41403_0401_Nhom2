// src/pages/PaymentPage/style.js

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

export const WrapperSection = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  border: 2px solid #f9b5c3;
  border-radius: 12px;
  background-color: #fff0f5;
  box-shadow: 0 2px 8px rgba(233, 94, 137, 0.1);
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

export const WrapperLeft = styled.div`
  flex: 3;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
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
  margin: 50px 0 40px;
`;
