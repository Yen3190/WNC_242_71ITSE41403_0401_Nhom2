import styled from "styled-components";

export const ProductsContainer = styled.section`
    padding: 4rem 10%;
`;

export const Heading = styled.h1`
    text-align: center;
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 3rem;

    span {
        color: var(--pink);
    }
`;

export const BoxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem; 
    justify-content: center;
    align-items: start;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        justify-content: center;
    }
`;

export const Box = styled.div`
    width: 420px; 
    height: 630px; 
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.1);
    border-radius: 1rem;
    border: 0.15rem solid rgba(0, 0, 0, 0.1);
    position: relative;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`;

export const Discount = styled.span`
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.9rem 1.4rem;
    font-size: 2rem;
    color: #e76f8b;
    font-weight: bold;
    background: rgba(255, 52, 153, 0.05);
    z-index: 1;
    border-radius: 0.5rem;
`;

export const ImageContainer = styled.div`
    position: relative;
    text-align: center;
    width: 100%;
    height: 500px; 
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.3s ease-in-out;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const Icons = styled.div`
    position: absolute;
    bottom: -6rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    transition: 0.3s ease-in-out;

    ${Box}:hover & {
        bottom: 0;
    }
`;

export const IconButton = styled.a`
    height: 5rem;
    line-height: 5rem;
    font-size: 2rem;
    width: 33.3%;
    background: #e76f8b;
    color: #fff;
    text-align: center;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        background: grey;
    }

    &.cart-btn {
        border-left: 1px solid #fff7;
        border-right: 1px solid #fff7;
        width: 100%;
    }
`;

export const Content = styled.div`
    padding: 0.8rem;
    text-align: center;
`;

export const ProductTitle = styled.h3`
    font-size: 3rem; /* Tăng kích thước chữ */
    color: #333;
`;

export const Price = styled.div`
    font-size: 3rem; /* Tăng kích thước giá */
    color: #e76f8b;
    font-weight: bold;
    padding-top: 0.5rem; /* Giảm khoảng cách giữa tiêu đề và giá */

    span {
        font-size: 2rem;
        color: #999;
        text-decoration: line-through;
        margin-left: 0.5rem;
    }
`;
