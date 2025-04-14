import React from "react";
import styled from "styled-components";
import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";
import icon4 from "../../assets/images/icon4.png";


const IconsContainer = styled.section`
    background: rgb(220, 220, 220);
    display: flex;
    flex-wrap: wrap;
    gap: 2rem; /* Khoảng cách giữa các icon */
    padding: 3rem 5%;
    justify-content: center;
    margin-top: -3rem;
`;

const IconBox = styled.div`
    background: #fff;
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    padding: 3rem;
    display: flex;
    align-items: center;
    flex: 1 1 30rem;
    max-width: 400px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;


const IconImage = styled.img`
    width: 150px; 
    height: 140px; 
    margin-right: 2rem;
`;

const Info = styled.div`
    h3 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: bold;
    }
    
    span {
        color: #555;
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const IconsComponent = () => {
    const iconData = [
        { img: icon1, title: "Free Delivery", desc: "On all orders" },
        { img: icon2, title: "10 Days Returns", desc: "Moneyback guarantee" },
        { img: icon3, title: "Offers & Gifts", desc: "On all orders" },
        { img: icon4, title: "Secure Payments", desc: "Protected by PayPal" }
    ];

    return (
        <IconsContainer>
            {iconData.map((item, index) => (
                <IconBox key={index}>
                    <IconImage src={item.img} alt={item.title} />
                    <Info>
                        <h3>{item.title}</h3>
                        <span>{item.desc}</span>
                    </Info>
                </IconBox>
            ))}
        </IconsContainer>
    );
};

export default IconsComponent;
