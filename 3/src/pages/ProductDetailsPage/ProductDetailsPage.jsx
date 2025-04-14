import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import { useParams } from 'react-router-dom';
const ProductDetailsPage = () =>{
    const {id} = useParams()

    return(
        <div style={{background:"#efefef", height: '1000px'}}>
            <h5 style={{}}>Trang chủ - Chi tiết sản phẩm</h5>
            <ProductDetailsComponent idProduct ={id}/>
        </div>
        
    )
}

export default ProductDetailsPage