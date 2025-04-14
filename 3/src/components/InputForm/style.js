
import styled from "styled-components";
import { Input } from 'antd';

export const WrapperInputStyle = styled(Input)`
    // Các border mặc định của Ant Design input
    border: 1px solid #ccc;
    &:hover{
        border-color: #ccc;
    }
    &:focus {
        border-color: #e76f8b;  // Màu hồng khi focus vào input
        box-shadow: 0 0 5px rgba(231, 111, 139, 0.5); // Thêm một chút hiệu ứng shadow cho border
    }
`;
