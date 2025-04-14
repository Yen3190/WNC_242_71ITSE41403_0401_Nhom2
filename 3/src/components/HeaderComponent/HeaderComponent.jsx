import React, { useEffect, useState } from "react";
import { Col, Badge, Popover, Spin } from "antd";  // Import Spin để hiển thị loading
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlide";
import {
    WrapperHeader,
    WrapperLogoHeader,
    WrapperCham,
    WrapperNavbar,
    WrapperIcons,
    WrapperToggleInput,
    WrapperToggleLabel,
    WrapperHeaderAccount,
    WrapperTextHeaderSmall,
    WrapperContentPopup
} from "./style";
import { CaretDownOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';

const HeaderComponent = ({ isHiddenCart = false, isHiddenSearch = false, isHiddenHeart = false }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const [loading, setLoading] = useState(false);
    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
        navigate('/');
    };

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)

    }, [user?.name, user?.avatar])
    const order = useSelector((state)=> state.order)
    const content = (
        <div>
            {/* Hiển thị spinner khi loading là true */}
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={handleLogout}>
                {loading ? <Spin size="small" /> : 'Đăng xuất'}
            </WrapperContentPopup>

        </div>
    );

    return (
        <WrapperHeader >
            {/* Toggle Menu */}
            <WrapperToggleInput type="checkbox" id="toggler" />
            <WrapperToggleLabel htmlFor="toggler" className="fas fa-bars" />

            {/* Logo */}
            <Col span={6}>
                <WrapperLogoHeader style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Flowers<WrapperCham>.</WrapperCham>
                </WrapperLogoHeader>
            </Col>

            {/* Navbar */}
            <WrapperNavbar>
                <div role="link" onClick={() => navigate('/')}>Home</div>
                <div href="#about">About</div>
                <div onClick={() => navigate('/products')}>Products</div>
                <div href="#review">Review</div>
                <div href="#contact">Contact</div>
            </WrapperNavbar>

            {/* Icons */}
            <Col span={8} style={{ display: 'flex', gap: '20px' }}>
                <WrapperIcons>
                    <div className="icon1">
                        {!isHiddenSearch &&(
                            <a onClick={() => navigate('/search')} className="fas fa-search"></a>
                        )}
                        

                        {!isHiddenHeart && (
                            <Badge count={4} size="medium" style={{ transform: 'translate(15px, -7px)' }} color="#e76f8b">
                                <a href="#" className="fas fa-heart"></a>
                            </Badge>
                        )}

                        <WrapperHeaderAccount>

                            {userAvatar ? (<img src={userAvatar} alt='avatar' style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid #e76f8b',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease-in-out',
                            }} />) : (<UserOutlined style={{ fontSize: '26px' }} />)}


                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <span style={{ cursor: 'pointer' }}>{user.name}</span>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall >Đăng ký/Đăng nhập</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )} 
                        </WrapperHeaderAccount>
                        <WrapperHeaderAccount onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                            {!isHiddenCart && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Badge count={order?.orderItems?.length} size="medium" style={{ transform: 'translate(12px, -12px)' }} color="#e76f8b">
                                        <ShoppingCartOutlined style={{ fontSize: '26px' }} />
                                    </Badge>
                                    <WrapperTextHeaderSmall style={{ marginTop: '5px' }}>Giỏ hàng</WrapperTextHeaderSmall>
                                </div>
                            )}

                        </WrapperHeaderAccount>
                    </div>
                </WrapperIcons>
            </Col>
        </WrapperHeader>
    );
};

export default HeaderComponent;


