import React from "react";
import styled from "styled-components";

const HomeBanner = styled.section`
    position: absolute;
    top: 10%;
    left: 25%;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: left;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    max-width: 60rem;
    margin-left: 15rem;
    padding: 20px;
    border-radius: 10px;
`;

const Title = styled.h3`
    font-size: 7rem;
    color: #333;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    font-weight: bolder;
    margin-bottom: 0.2rem; /* Giảm khoảng cách giữa Title và Subtitle */
`;

const Subtitle = styled.span`
    font-size: 4rem;
    color: rgb(238, 115, 174);
    padding: 0;
    display: block;
    line-height: 1.3;
    margin-bottom: 1.5rem; 
`;

const Description = styled.p`
    font-size: 1.5rem;
    color: #666;
    padding: 0;
    line-height: 1.4;
    margin-bottom: 1.5rem; 
`;

const ShopButton = styled.a`
    display: inline-block;
    padding: 10px 20px;
    background: #333;
    color: white;
    text-decoration: none;
    border-radius: 20px;
    transition: 0.3s ease-in-out;
    font-size: 1.5rem;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    text-align: center;

    &:hover {
        background:rgb(225, 95, 158);
    }
`;

const HomeBannerComponent = () => {
    return (
        <HomeBanner>
            <Content>
                <Title>Fresh Flowers</Title>
                <Subtitle>Natural & Beautiful Flowers</Subtitle>
                <Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ea exercitationem commodi minus quaerat! Dolorum nesciunt consequatur eius facere porro.
                </Description>
                <ShopButton href="#">Shop Now</ShopButton>
            </Content>
        </HomeBanner>
    );
};

export default HomeBannerComponent;
