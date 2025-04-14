import React from 'react';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const {
        size = 'large',
        placeholder = 'Tìm kiếm...',
        textButton = 'Tìm kiếm',
        bordered = true,
        backgroundColorInput = 'white',
        backgroundColorButton = '#e76f8b',
        colorButton = '#fff',
        maxWidth = '1200px'
    } = props;

    return (
        <div className="search-form">
            <form style={{
                maxWidth: maxWidth,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <InputComponent
                    size={size}
                    placeholder={placeholder}
                    bordered={bordered}
                    style={{
                        width: '100%',
                        backgroundColor: backgroundColorInput,
                        padding: '1.2rem 1.4rem',
                        fontSize: '1.8rem',
                        borderRadius: '.5rem',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        border: 'var(--border)'
                    }}
                    {...props}
                />
                <ButtonComponent
                    size={size}
                    styleButton={{
                        background: backgroundColorButton,
                        border: !bordered ? 'none' : 'var(--border)',
                        padding: '1.2rem 2rem',
                        fontSize: '1.8rem',
                        borderRadius: '5rem',
                        boxShadow: '0px 4px 10px rgba(231, 111, 139, 0.5)', // Bóng đổ mặc định
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer'
                    }}
                    styleTextButton={{
                        color: colorButton,
                        fontWeight: 'bold'
                    }}
                    textButton={textButton}
                    showIcon={true}
                />
            </form>
        </div>
    );
};

export default ButtonInputSearch;
