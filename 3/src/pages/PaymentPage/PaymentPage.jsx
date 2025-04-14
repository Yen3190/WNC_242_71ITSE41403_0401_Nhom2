// src/pages/PaymentPage/PaymentPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Form } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as OrderService from "../../services/OrderService";
import * as message from '../../components/Message/Message';
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";

// 👉 Import styled-components từ file style.js
import {
    Heading,
    WrapperLeft,
    WrapperRight,
    WrapperSection,
    WrapperSummaryInfo
} from "./style";

const PaymentPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            });
        }
    }, [isOpenModalUpdateInfo]);

    const mutationUpdate = useMutationHook((data) => {
        const { id, token, ...rests } = data;
        return UserService.updateUser(id, { ...rests }, token);
    });

    const mutationAddOrder = useMutationHook((data) => {
        const { token, ...rests } = data;
        return OrderService.createOrder(token, { ...rests });
    });

    const totalPrice = order?.orderItems
        ?.filter(item => item.checked)
        ?.reduce((total, item) => total + item.price * item.amount, 0);

    const handleAddOrder = () => {
        const selectedItems = order?.orderItems?.filter(item => item.checked);

        if (selectedItems.length === 0) {
            message.error("Chưa có sản phẩm nào được chọn");
            return;
        }

        if (!user?.access_token || !user?.id) {
            message.error("Thông tin người dùng không hợp lệ");
            return;
        }

        const itemsPrice = selectedItems.reduce((total, item) => total + item.price * item.amount, 0);
        const shippingPrice = 50000;
        const totalPrice = itemsPrice + shippingPrice;

        if (!paymentMethod) {
            message.error("Phương thức thanh toán là bắt buộc");
            return;
        }

        if (!user?.name || !user?.address || !user?.phone || !user?.city) {
            message.error("Thông tin giao hàng chưa đầy đủ");
            return;
        }

        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: selectedItems,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod,
                totalPrice,
                itemsPrice,
                shippingPrice,
                user: user?.id
            },
            {
                onSuccess: () => {
                    message.success("Đặt hàng thành công");
                    setTimeout(() => {
                        navigate("/orderSuccess", {
                            state: {
                                paymentMethod,
                                orders: order?.orderItems
                            }
                        });
                    }, 1500);
                },
                onError: (error) => {
                    console.error('Error creating order:', error);
                    message.error("Có lỗi xảy ra khi tạo đơn hàng. Kiểm tra lại thông tin và thử lại.");
                }
            }
        );
    };

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            address: '',
            city: ''
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false);
    };

    const handleUpdateInfoUser = () => {
        const { name, address, city, phone } = stateUserDetails;
        if (name && address && city && phone) {
            mutationUpdate.mutate(
                { id: user?.id, token: user?.access_token, ...stateUserDetails },
                {
                    onSuccess: () => {
                        dispatch(updateUser({ name, address, city, phone }));
                        setIsOpenModalUpdateInfo(false);
                        message.success("Cập nhật thông tin thành công");
                    },
                    onError: () => {
                        message.error("Cập nhật thất bại. Vui lòng thử lại.");
                    }
                }
            );
        } else {
            message.error("Vui lòng điền đầy đủ thông tin");
        }
    };

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ marginTop: "80px", background: '#f5f5fa', width: "100%", minHeight: "100vh" }}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <Heading style={{ color: "#f5f5fa", fontSize: "10px" }}>Test</Heading>
                <Heading style={{ margin: "10px", marginBottom: "20px", color: "#e76f8b", fontSize: "40px" }}>
                    Payment <span style={{ color: "#333" }}>Method</span>
                </Heading>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperSection>
                            <h3>Chọn phương thức giao hàng</h3>
                            <Radio.Group onChange={(e) => setDeliveryMethod(e.target.value)} value={deliveryMethod}>
                                <Radio value="standard">Giao hàng tiêu chuẩn (3-5 ngày)</Radio>
                                <Radio value="express">Giao hàng nhanh (1-2 ngày)</Radio>
                            </Radio.Group>
                        </WrapperSection>

                        <WrapperSection>
                            <h3>Chọn phương thức thanh toán</h3>
                            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                                <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                                <Radio value="card">Thẻ tín dụng/Ghi nợ</Radio>
                                <Radio value="momo">Ví MoMo</Radio>
                            </Radio.Group>
                        </WrapperSection>
                    </WrapperLeft>

                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperSummaryInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ color: "#e76f8b", fontWeight: "bolder" }}>
                                        {`${user?.address} ${user?.city} - `}
                                    </span>
                                    <span
                                        onClick={() => setIsOpenModalUpdateInfo(true)}
                                        style={{ color: "blue", cursor: 'pointer' }}
                                    >
                                        Thay đổi
                                    </span>
                                </div>
                            </WrapperSummaryInfo>

                            <WrapperSummaryInfo>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Subtotal</span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {totalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Discount</span>
                                    <span style={{ fontWeight: 'bold' }}>
                                        {(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#ff424e', fontWeight: 'bold', fontSize: 16 }}>
                                        {totalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                            </WrapperSummaryInfo>

                            <ButtonComponent
                                onClick={handleAddOrder}
                                size="large"
                                styleButton={{ width: '100%', background: '#e76f8b', color: '#fff', fontWeight: "bolder" }}
                                textButton="Đặt hàng"
                                disabled={totalPrice === 0}
                            />
                        </div>
                    </WrapperRight>
                </div>
            </div>

            <ModalComponent
                forceRender
                title="Cập nhật thông tin giao hàng"
                open={isOpenModalUpdateInfo}
                onCancel={handleCancelUpdate}
                onOk={handleUpdateInfoUser}
            >
                <Form name="updateInfo" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} autoComplete="on" form={form}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Tên người dùng' }]}>
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item label="City" name="city" rules={[{ required: true, message: 'Thành phố' }]}>
                        <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Số điện thoại' }]}>
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Địa chỉ' }]}>
                        <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                    </Form.Item>
                </Form>
            </ModalComponent>
        </div>
    );
};

export default PaymentPage;
