import React from "react";
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

const FavoritePage = () => {
    const order = useSelector((state) => state.order);
    const dispatch = useDispatch();

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

    const totalPrice = order?.orderItems
        ?.filter(item => item.checked)
        ?.reduce((total, item) => total + item.price * item.amount, 0);

    const allChecked = order?.orderItems?.length > 0 && order?.orderItems.every(item => item.checked);
    const someChecked = order?.orderItems?.some(item => item.checked);

    return (
        <div style={{ marginTop: "80px", background: '#f5f5fa', width: "100%", minHeight: "100vh" }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <Heading style={{ margin: "50px", marginBottom: "40px", color: "#e76f8b", fontSize: "40px" }}>
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
        </div>
    );
};

export default FavoritePage;
