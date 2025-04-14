import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const Heading = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: bolder;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    color: gray;
    margin-top: 50px;
    margin-bottom: 0;
`;

export const WrapperButtonMore = styled(ButtonComponent)`
    border: 1px solid #e76f8b;
    color: #e76f8b;
    width: 240px;
    height: 38px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: #e76f8b;
        color: white;
    }
`;
