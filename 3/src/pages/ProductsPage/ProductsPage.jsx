import React, { useEffect, useState } from "react";
import ButtonInputSearch from "../../components/ButtonInputSearch/ButtonInputSearch";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProductService from '../../services/ProductService';
import { searchProduct as searchProductAction } from "../../redux/slides/productSlide";
import { useQuery } from "@tanstack/react-query";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Heading, WrapperButtonMore } from './style';

const ProductsPage = () => {
    const [search, setSearch] = useState('');
    const [stateProducts, setStateProducts] = useState([]);
    const dispatch = useDispatch();
    const [limit, setLimit] = useState(6); // Handle product limit
    const searchProduct = useSelector((state) => state?.product?.search);

    // Modify fetch function to include limit
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProducts(searchProduct, limit);  // Pass limit here
        return res?.data || [];
    };

    const { isLoading, data: products, isPreviousData } = useQuery({
        queryKey: ['products', searchProduct, limit], 
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true  
    });

    const onSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        dispatch(searchProductAction(value));
    };

    useEffect(() => {
        if (products?.length > 0) {
            setStateProducts(products);
        } else {
            setStateProducts([]);
        }
    }, [products]);


    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ backgroundColor: "#efefef", minHeight: "100vh", paddingTop: "70px" }}>
            <Heading style={{ margin: "50px", marginBottom: "40px", color: "#333", fontSize: "40px" }}>Shop <span style={{ color: "#e76f8b" }}>Products</span></Heading>
            <ButtonInputSearch onChange={onSearch} />

            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button
                    style={{
                        backgroundColor: "#e76f8b",
                        color: "white",
                        border: "none",
                        padding: "20px 30px",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    Tìm gì đó
                </Button>
            </div>


            <div
                style={{
                    marginTop: "40px",
                    padding: "0 100px",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    boxSizing: "border-box",
                    marginBottom: "40px"
                }}
            >
                {isLoading ? (
                    <p>Đang tải sản phẩm...</p>
                ) : stateProducts.length === 0 ? (
                    <p>Không có sản phẩm phù hợp.</p>
                ) : (
                    stateProducts.map((product) => (
                        <CardComponent
                            key={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                            discount={product.discount}
                            rating={product.rating}
                            type={product.type}
                            countInSttock={product.countInSttock}
                            description={product.description}
                            id={product._id}
                        />
                    ))
                )}
            </div>


            <div style={{ display: "flex", justifyContent: "center", marginTop: "-6px" }}>
                <WrapperButtonMore
                    style={{ fontSize: '20px', marginBottom: '20px' }}
                    textButton="Xem thêm"
                    type="outline"
                    onClick={() => setLimit(prev => prev + 6)}
                />
            </div>

        </div>
    );
};

export default ProductsPage;
