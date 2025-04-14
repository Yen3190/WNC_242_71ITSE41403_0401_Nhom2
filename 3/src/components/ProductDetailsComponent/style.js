import styled from "styled-components";
import {Image, Col, InputNumber} from 'antd';
export const WrapperStyleImageSmall = styled(Image)`
    height: 100px;
    width:  100px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
    color:#e76f8b;
    font-size: 40px;
    font-weight: bolder;
    line-height: 32px;
    word-break: break-word;
    

`

export const WrapperStyleTextSell = styled.div`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120,120,120)
`

export const WrapperPriceProduct= styled.div`
    color: #e76f8b;
    background: rgb(250,250,250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct= styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct= styled.div`
    span.address {
        text-decoration: underline;
        font-size: 15px;
        font-weight: bolder;
        line-height: 24px;
        white-space: nowrap;
        overflow:  hidden;
        text-overflow: ellipsis;
    }
    span.change-address{
        color: rgb(11,116,229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
        flex-shrink: 0;    
    }
`



export const WrapperQualityProduct= styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 100px;
    border: 1px solid pink;
    border-radius: 4px;


`


export const WrapperInputNumber= styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 60px;
        border-top:  none;
        border-bottom: none;
    &.ant-input-number-handler-wrap{
        display: none;
    }
    }
    
`
export const WrapperDescription = styled.div`
    font-size: 1.5rem;
    color: #333;
    line-height: 1.6;

    .desc-title {
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 8px;
        color:  #e76f8b;
    }
`;
