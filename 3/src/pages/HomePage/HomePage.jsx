import React, { useState } from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import AboutComponent from "../../components/AboutComponent/AboutComponent";
import HomeBannerComponent from "../../components/HomeBannerComponent/HomeBannerComponent";
import IconsComponent from "../../components/IconsComponent/IconsComponent";
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bg2.jpg';
import bg3 from '../../assets/images/bg3.jpg';
import { Heading, WrapperButtonMore } from './style';
import { ProductsContainer, BoxContainer } from "../../components/CardComponent/style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService';
import { useSelector } from "react-redux";


const HomePage = () => {
    
    const [limit, setLimit] = useState(6)
    

    const fetchProductAll = async (context) => {
        console.log('context', context)
        const search =''
        const limit = context?.queryKey && context?.queryKey[1]
        const res = await ProductService.getAllProducts(search, limit);
        return res;
    }

    //const {isLoading, data} = useQuery(['products'],fetchProductAll)
    const { isLoading, data: products } = useQuery({
        queryKey: ['products', limit], // Đây là key dùng để lưu trữ cache cho query này
        queryFn: fetchProductAll, // Hàm gọi API
        retry: 3,
        retryDelay: 1000

    });

    console.log('data', products)
    return (
        <div style={{ marginTop: "75px", position: "relative" }}>
            <HomeBannerComponent />
            <SliderComponent arrImages={[bg1, bg2, bg3]} />
            <div>
                <AboutComponent />
            </div>
            <IconsComponent />
            <Heading style={{ margin: "50px", marginBottom: "0px", color: "#333" }}>Latest <span style={{ color: "#e76f8b" }}>Products</span></Heading>
            <ProductsContainer>
                <BoxContainer>
                    {products?.data?.map((product) => {
                        return (
                            <CardComponent
                                key={product._id}
                                countInSttock={product.countInSttock}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                discount = {product.discount}
                                id={product._id}
                            />

                        )
                    })}
                </BoxContainer>
                
            </ProductsContainer>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "-6px" }}>
                <WrapperButtonMore size="large" styleButton={{ background: '#e76f8b', color: '#fff', fontWeight:"bolder"}} textButton="Xem thêm" type="outline" onClick={()=> setLimit(prev=>prev + 6)} />
            </div>
            



        </div>
    );
};

export default HomePage;
