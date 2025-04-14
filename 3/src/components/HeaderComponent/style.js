import { Row } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled(Row)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 2rem 9%;
    display: flex;
    align-items: center;
    //justify-content: space-between;
    justify-content: ${(props) => (props.isHiddenCart && props.isHiddenSearch && props.isHiddenHeart ? 'center' : 'space-between')};
    z-index: 1000;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    
`;

export const WrapperLogoHeader = styled.span`
    font-size: 3rem;
    color: #333;
    font-weight: bolder;
    display: flex;
    align-items: center;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
`;


export const WrapperCham = styled.span`
    font-size: 3rem;
    color: #e76f8b;
    font-weight: bold;
    margin-left: 0px;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
`;

export const WrapperNavbar = styled.div`
    display: flex;
    gap: 3.5rem;
    margin-left: -110px;

    div {
        font-size: 2rem;
        color: #666;
        text-decoration: none;
        transition: 0.001s linear;
        cursor: pointer;

        &:hover {
            color: #e76f8b;
        }
    }

    /* Ẩn menu mặc định trên màn hình nhỏ */
    @media (max-width: 768px) {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #fff;
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .1);
        padding: 1rem 0;
        text-align: center;
    }
`;


export const WrapperIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    .icon1 {
        display: flex;
        gap: 2rem;

        a {
            margin-top: 5px;
            font-size: 26px;
            color: #333;
            transition: 0.2s linear;

            &:hover {
                color: #e76f8b;
            }
        }
    }
`;

export const WrapperCartButton = styled.button`
    padding: 5px 8px;
    background: none;
    border: none;
    color: #333;
    position: relative;
    cursor: pointer;

    .bi {
        font-size: 23px;
    }
`;




export const WrapperToggleInput = styled.input`
    display: none;

    /* Khi checkbox được checked, hiển thị menu */
    &:checked ~ ${WrapperNavbar} {
        display: flex;
    }
`;

export const WrapperToggleLabel = styled.label`
    font-size: 3rem;
    color: #333;
    border-radius: .5rem;
    padding: .5rem 1.5rem;
    cursor: pointer;
    border: .1rem solid rgba(0, 0, 0, .3);
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    
    &:hover {
            color: #e76f8b;
        }
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 15px;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    color: #333;
    &:hover {
            color: #e76f8b;
        }
`
export const WrapperIconHeader = styled.span`
    font-size: 11px;
    color: #fff;

`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover{
        color: #e76f8b;
    }
`