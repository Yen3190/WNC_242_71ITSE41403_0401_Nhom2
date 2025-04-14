import React, { useState } from 'react';
import { Menu } from 'antd';
import { getItem } from '../../untils';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
const AdminPage = () => {
    const items = [
        getItem("Người dùng", "user", <UserOutlined />),
        getItem("Sản phẩm", "product", <AppstoreOutlined />),
    ];

    const [keySelected, setkeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (<AdminUser />)
            case 'product':
                return (<AdminProduct />)
            default:
                return <></>
        }

    }
    const handleOnClick = ({ key }) => {

        setkeySelected(key)
    }
    console.log('keySelected', keySelected)
    return (
        <>
            <HeaderComponent isHiddenCart isHiddenSearch isHiddenHeart />
            <div style={{ display: 'flex', marginTop: "80px" }}>
                <Menu
                    mode="inline"
tr
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '90vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1,  padding:'15px'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>

    )
}

export default AdminPage