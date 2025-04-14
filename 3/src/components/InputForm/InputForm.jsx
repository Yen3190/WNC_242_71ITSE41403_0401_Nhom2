import React from 'react';
import { WrapperInputStyle } from './style';

const InputForm = (props) => {
    const { placeholder = 'Nhập text', ...rests } = props;
    
    return (
        <WrapperInputStyle 
            placeholder={placeholder} 
            value={props.value} 
            onChange={props.onChange} 
            {...rests} 
        />
    );
};

export default InputForm;
