import React, { useState } from "react";
import {
    Box,
    ImageContainer,
    Discount,
    Icons,
    IconButton,
    Content,
    ProductTitle,
    Price
} from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, addToWishlist, toggleWishlist, removeFromWishlist } from '../../redux/slides/orderSlide';
import { useLocation } from 'react-router-dom';

const CardComponent = (props) => {
    const { countInSttock, description, image, name, price, rating, type, discount, id } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [cartAnimate, setCartAnimate] = useState(false);
    const [heartAnimate, setHeartAnimate] = useState(false);

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`);
    };
    const user = useSelector((state) => state.user);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const newProduct = {
            product: id,
            name,
            image,
            price,
            amount: 1
        };
        dispatch(addOrderProduct({ orderItems: newProduct }));

        setCartAnimate(true);
        setTimeout(() => setCartAnimate(false), 300);
    };

    
   

    // const handleHeartClick = (e) => {
    //     e.stopPropagation();
    //     setHeartAnimate(true);
    //     setTimeout(() => setHeartAnimate(false), 300);
    // };

    const wishlist = useSelector((state) => state.order.wishlistItems);

    const handleHeartClick = (e) => {
        e.stopPropagation();

        if (!user?.id) {
            navigate('/sign-in', { state: location.pathname }); 
        } else {
            const isWished = wishlist.find(item => item.product === id);
            if (isWished) {
                dispatch(removeFromWishlist(id));
            } else {
                const newItem = {
                    product: id,
                    name,
                    image,
                    price
                };
                dispatch(addToWishlist(newItem));
            }
        }

        setHeartAnimate(true);
        setTimeout(() => setHeartAnimate(false), 300);
    };



    return (
        <Box style={{ cursor: "pointer" }} onClick={() => handleDetailsProduct(id)}>
            <Discount>- {discount || 10}%</Discount>
            <ImageContainer>
                <img src={image} alt={name} />
                <Icons>
                    <IconButton
                        className={`fas fa-heart ${heartAnimate ? "animate-pop" : ""}`}
                        onClick={handleHeartClick}
                    />
                    <IconButton
                        className={`cart-btn ${cartAnimate ? "animate-pop" : ""}`}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </IconButton>

                    <IconButton className="fas fa-share" />
                </Icons>
            </ImageContainer>
            <Content>
                <ProductTitle>{name}</ProductTitle>
                <Price>${price} <span>$21.99</span></Price>
            </Content>
        </Box>
    );
};

export default CardComponent;
