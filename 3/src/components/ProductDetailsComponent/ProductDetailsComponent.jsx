import React, { useState } from 'react'
import { Row, Col, Image, Spin } from "antd"
import { WrapperStyleImageSmall, WrapperDescription, WrapperStyleColImage, WrapperStyleNameProduct, WrapperQualityProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperAddressProduct, WrapperInputNumber } from './style'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addOrderProduct } from '../../redux/slides/orderSlide'


const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    
    const user =  useSelector((state)=> state.user)
    const navigate = useNavigate()
    const location = useLocation()
    console.log('location', location)
    const dispatch = useDispatch()
    const onChange = (e) => {
        setNumProduct(Number(e.target.value))
    }

    const fetchGetDetailsProducts = async () => {
        if (typeof idProduct !== 'string') {
            console.error(' idProduct không hợp lệ:', idProduct)
            return null
        }

        try {
            const res = await ProductService.getDetailsProduct(idProduct)
            return res?.data
        } catch (error) {
            console.error('Lỗi khi gọi API lấy chi tiết sản phẩm:', error)
            return null
        }
    }

    const { isLoading, data: product } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProducts,
        enabled: !!idProduct,
    })

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}><Spin size="large" /></div>
    }

    if (!product) {
        return <div style={{ textAlign: 'center', marginTop: 100, color: 'red' }}>Không tìm thấy sản phẩm</div>
    }


    const handleChangeCount = (type) => {
        if (type === 'increase') {
            if (numProduct < (product?.countInStock || 10)) {
                setNumProduct(prev => prev + 1);
            }
        } else {
            if (numProduct > 1) {
                setNumProduct(prev => prev - 1);
            }
        }
    };
    const handleAddOrderProduct =()=>{
        if(!user?.id){
            navigate('/sign-in', {state: location?.pathname})
        }else{
            dispatch(addOrderProduct({
                orderItems:{
                    name: product?.name,
                    amount: numProduct,
                    image: product?.image,
                    price: product?.price,
                    product: product?._id
                }
            }))
        }
    }
    console.log('product details', product, user)
    return (
        <div style={{ marginTop: '60px', marginLeft: '150px', marginRight: '150px', borderRadius: '4px' }}>
            <Row gutter={16} style={{ padding: '20px 20px', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: "20px", marginTop: '100px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <div style={{ width: '100%', height: '600px', overflow: 'hidden', borderRadius: '20px' }}>
                        <Image
                            src={product?.image}
                            alt={product?.name}
                            preview={false}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '20px'
                            }}
                        />
                    </div>
                    <Row style={{ marginTop: '10px', paddingTop: '10px', display: 'flex', gap: '10px' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={product?.image} alt="image small" preview={false} width={60} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{product?.name}</WrapperStyleNameProduct>
                    <div>
                        {Array.from({ length: 5 }, (_, i) => (
                            <StarFilled
                                key={i}
                                style={{
                                    fontSize: '12px',
                                    color: i < Math.round(product.rating || 0) ? 'rgb(253,216,54)' : '#ccc'
                                }}
                            />
                        ))}
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{product?.price}$</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>Tân Phú, Thành phố Hồ Chí Minh</span>
                        <span className='change-address'> - Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div>Số lượng</div>
                        <WrapperQualityProduct style={{ margin: '10px 0' }}>
                            <button style={{ border: 'none', background: 'transparent', cursor:'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber min={1} max={product?.countInStock || 10} onChange={onChange} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent',  cursor:'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <WrapperDescription>
                        <div className="desc-title">Description:</div>
                        <p>{product?.description || "Hiện tại chưa có mô tả chi tiết cho sản phẩm này."}</p>
                    </WrapperDescription>
                    <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            border={false}
                            size={40}
                            styleButton={{
                                background: '#e76f8b', height: '48px', width: '220px', border: 'none', borderRadius: '4px'
                            }}
                            textButton={'Chọn mua'}
                            onClick={handleAddOrderProduct}
                            styleTextButton={{ color: '#fff', fontSize: '20px', fontWeight: 'bolder' }}
                        />
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default ProductDetailsComponent
