import React, { useEffect, useState } from "react";
import {
    WrapperCountOrder,
    WrapperStyleHeader,
    WrapperRight,
    WrapperSummaryInfo,
    WrapperItemOrder,
    WrapperLeft,
    WrapperListOrder,
    WrapperPriceDiscount,
    Heading
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import {
    increaseAmount,
    decreaseAmount,
    removeOrderProduct,
    updateAmount,
    toggleCheckProduct,
    toggleCheckAllProduct
} from "../../redux/slides/orderSlide";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { Form } from "antd";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }));
        } else {
            dispatch(decreaseAmount({ idProduct }));
        }
    };

    const handleRemoveProduct = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }));
    };

    const handleOnchangeCheckAll = (e) => {
        dispatch(toggleCheckAllProduct({ checked: e.target.checked }));
    };

    const handleInputChange = (value, idProduct) => {
        if (value && value >= 1) {
            dispatch(updateAmount({ idProduct, amount: value }));
        }
    };

    useEffect(() => {
            form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails]) 

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isOpenModalUpdateInfo])
    const handleChangeAddress =()=>{
        setIsOpenModalUpdateInfo(true)
    }
    const mutationUpdate = useMutationHook( //Đã check
        (data) => {
            console.log('data', data)
            const { id, token, ...rests } = data;
            const res = UserService.updateUser(
                id,
                { ...rests }, token,
            );
            return res
        }
    );

    const totalPrice = order?.orderItems
        ?.filter(item => item.checked)
        ?.reduce((total, item) => total + item.price * item.amount, 0);

    const allChecked = order?.orderItems?.length > 0 && order?.orderItems.every(item => item.checked);
    const someChecked = order?.orderItems?.some(item => item.checked);
    const handleAddCard = () => {
        console.log('user', user)
        if (!user?.phone || !user.address || !user.name || !user.city) {
            setIsOpenModalUpdateInfo(true)
        } else{
           navigate('/payment')
        }
    }
    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
        setIsOpenModalUpdateInfo(false)
    }
    const {data} = mutationUpdate
    console.log('data', data)

    const handleUpdateInfoUser = () => {
        console.log('stateUserDetails', stateUserDetails)
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {

            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, city, phone }))
                    setIsOpenModalUpdateInfo(false)
                }
            })

        }
    }


   

    const handleOnChangeDetails = (e) => { 
        console.log('check', e.target.name, e.target.value)
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div style={{ marginTop: "80px", background: '#f5f5fa', width: "100%", minHeight: "100vh" }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <Heading style={{ color: "#f5f5fa", fontSize:"20px"}}>Test</Heading>
                <Heading style={{ margin: "10px", marginBottom: "20px", color: "#e76f8b", fontSize: "40px" }}>
                    Shopping <span style={{ color: "#333" }}>Cart</span>
                </Heading>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox
                                    onChange={handleOnchangeCheckAll}
                                    checked={allChecked}
                                    indeterminate={someChecked && !allChecked}
                                />
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Tổng</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} />
                            </div>
                        </WrapperStyleHeader>

                        <WrapperListOrder>
                            {order?.orderItems?.map((item) => (
                                <WrapperItemOrder key={item.product}>
                                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Checkbox
                                            checked={item.checked}
                                            onChange={() => dispatch(toggleCheckProduct({ idProduct: item.product }))}
                                        />
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
                                        <WrapperCountOrder>
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
                                        </WrapperCountOrder>
                                        <span style={{ color: "rgb(255,66,78)", fontSize: '13px', fontWeight: 500 }}>
                                            {(item?.price * item?.amount)?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </span>
                                        <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleRemoveProduct(item.product)} />
                                    </div>
                                </WrapperItemOrder>
                            ))}
                        </WrapperListOrder>
                    </WrapperLeft>

                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperSummaryInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ color: " #e76f8b", fontWeight:"bolder"}}>{`${user?.address} ${user?.city} - ` }</span>
                                    <span onClick={handleChangeAddress} style={{ color: "blue", cursor: 'pointer' }}>Thay đổi</span>
                                </div>
                            </WrapperSummaryInfo>
                            <WrapperSummaryInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Subtotal</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {totalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Discount</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>
                                        {(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#ff424e', fontSize: '16px', fontWeight: 'bold' }}>
                                        {totalPrice?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </span>
                                </div>
                            </WrapperSummaryInfo>
                            <div style={{ marginTop: 16 }}>
                                <ButtonComponent
                                    onClick={() => handleAddCard()}
                                    size="large"
                                    styleButton={{ width: '100%', background: '#e76f8b', color: '#fff' }}
                                    textButton="Thanh toán"
                                    disabled={totalPrice === 0}
                                />
                            </div>
                        </div>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>

                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    //onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Tên người dùng' }]}
                    >
                        <InputComponent value={stateUserDetails.name} onChange={handleOnChangeDetails} name="name" />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Thành phố' }]}
                    >
                        <InputComponent value={stateUserDetails.city} onChange={handleOnChangeDetails} name="city" />
                    </Form.Item>


                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Số điện thoại' }]}
                    >
                        <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Số điện thoại' }]}
                    >
                        <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                    </Form.Item>

                </Form>
            </ModalComponent>

        </div>
    );
};

export default OrderPage;
