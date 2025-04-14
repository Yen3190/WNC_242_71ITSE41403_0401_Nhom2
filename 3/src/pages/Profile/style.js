import styled from "styled-components";
import {Upload} from 'antd';
export const WrapperHeader= styled.h1`
    color: #000;
    font-family: Verdana, Geneva, Tahoma, serif, sans-serif;
    font-weight: bolder;
    font-size: 18px;
    margin: 4px 0;
    color: #e76f8b
`

export const WrapperContentProfile =styled.div`
    display: flex;
    flex-direction:  column;
    border: 1px solid #ccc;
    width: 600px;
    margin: 0 auto;
    justify-content: center; 
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    gap: 30px
`

export const WrapperLabel= styled.label`
    color: black;
    font-size:  12px;
    line-height: 30px;
    font-weight: bolder;
    width:  60px;
    text-align: left
`
export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
`

// export const WrapperUploadFile = styled(Upload)`
//     & .ant-upload.ant-upload-select.ant-upload-select-picture-card{
//         width: 60px;
//         height: 60px;
//         border-radius: 50%;
//     }
//         & .ant-upload-list-item-info{
//         display:none    
//     }
// `

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    
`;
