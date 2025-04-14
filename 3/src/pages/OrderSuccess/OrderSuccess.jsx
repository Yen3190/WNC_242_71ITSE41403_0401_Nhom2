import React, { useEffect, useState } from "react";
import {

    WrapperItemOrder,
    WrapperLeft,
    WrapperPriceDiscount,
    Heading,
    WrapperSection,
    WrapperValue,
    WrapperListOrder
} from './style';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";



const OrderSuccess = () => {
    const order = useSelector((state) => state.order);
    const location = useLocation()
    console.log('location', location)
    return (
        <div style={{ marginTop: "80px", background: '#f5f5fa', width: "100%", minHeight: "100vh" }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <Heading style={{ color: "#f5f5fa", fontSize: "20px" }}>Test</Heading>
                <Heading style={{ margin: "10px", marginBottom: "20px", color: "#e76f8b", fontSize: "40px" }}>
                    Đơn hàng <span style={{ color: "#333" }}>đặt thành công</span>
                </Heading>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperSection>
                            <h3>Phương thức giao hàng</h3>
                            <WrapperValue style={{ fontSize: "15px" }}>
                                <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST </span>Giao hàng tiết kiệm
                            </WrapperValue>
                        </WrapperSection>

                        <WrapperSection>
                            <h3>Phương thức thanh toán</h3>
                            <WrapperValue style={{ fontSize: "15px" }}>
                                <span>Thanh toán khi nhận hàng</span>
                            </WrapperValue>
                        </WrapperSection>

                        <WrapperSection>
                            <WrapperListOrder>
                                {order?.orderItems?.map((item) => (
                                    <WrapperItemOrder key={item.product}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            
                                            <img src={item?.image} alt="product" style={{ width: '77px', height: "79px", objectFit: 'cover' }} />
                                            <div>{item?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {item?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </span>
                                                <WrapperPriceDiscount>
                                                    {item?.amount > 1 ? (item?.price + 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : ''}
                                                </WrapperPriceDiscount>
                                            </span>
                                            {/* <WrapperCountOrder>
                                                <button onClick={() => handleChangeCount('decrease', item.product)}>
                                                    <MinusOutlined />
                                                </button>
                                                <WrapperInputNumber
                                                    min={1}
                                                    value={item?.amount}
                                                    size="small"
                                                    onChange={(value) => handleInputChange(value, item.product)}
                                                />
                                                <button onClick={() => handleChangeCount('increase', item.product)}>
                                                    <PlusOutlined />
                                                </button>
                                            </WrapperCountOrder> */}
                                            {/* <span style={{ color: "rgb(255,66,78)", fontSize: '13px', fontWeight: 500 }}>
                                                {(item?.price * item?.amount)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </span> */}

                                        </div>
                                    </WrapperItemOrder>
                                ))}
                            </WrapperListOrder>
                        </WrapperSection>
                    </WrapperLeft>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
