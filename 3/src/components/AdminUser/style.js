import styled from "styled-components";
import { Upload } from 'antd';
export const WrapperHeader =styled.h1`
    color: #000,
    font-size:14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item ant-upload-list-item-error{
        display: none
    }
    &  .ant-upload-list-item-name{ 
        display: none;
    }
    & .ant-upload-list-item-actions{
        display: none;
    }
    & .anticon anticon-paper-clip{
        display: none;    
    }
    & .ant-upload-icon{
        display: none;
    }
`;