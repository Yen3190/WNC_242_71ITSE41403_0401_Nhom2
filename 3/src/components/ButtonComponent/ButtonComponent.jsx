import React, { useState } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'; // Import icon

const ButtonComponent = ({ 
    size, 
    disabled,
    styleButton = {}, 
    styleTextButton, 
    textButton, 
    showIcon = false, 
    colorButton = '#fff',
    ...rests
}) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Button
            size={size}
            disabled={disabled}
            onMouseDown={() => setIsClicked(true)}  
            onMouseUp={() => setIsClicked(false)}  
            onMouseLeave={() => setIsClicked(false)}
            style={{
                ...styleButton,
                background: disabled ? "#ccc" : styleButton?.background,
                boxShadow: isClicked 
                    ? '0px 2px 5px rgba(231, 111, 139, 0.8)' 
                    : 'none',
                transition: 'all 0.2s ease-in-out'
            }}
            {...rests}
        >
            {showIcon && <SearchOutlined style={{ color: colorButton, marginRight: 8 }} />}
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
};

export default ButtonComponent;
