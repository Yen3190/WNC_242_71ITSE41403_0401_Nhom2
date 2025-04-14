import React from 'react';
import { Input } from 'antd';

const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
    return (
        <Input
            size={size}
            placeholder={placeholder}
            bordered={bordered}
            style={{
                ...style,
                width: '100%' // Đảm bảo input chiếm toàn bộ chiều rộng
            }}
            {...rests}
        />
    );
};

export default InputComponent;
