import React from 'react';


export default function TextInput(props) {
    // Dynamically set placeholder text based on the presence of an error
    const dynamicPlaceholder = props.errorMessage || props.placeholder;

    return (
        <div className="input-box">
            <label htmlFor={props.name}>{props.label}</label>
            <i className={props.logo}></i>
            <input
                type={props.type}
                name={props.name}
                placeholder={dynamicPlaceholder}
                value={props.value}
                onChange={props.onChange}
                className={props.errorMessage ? 'error-input' : ''}
            />
        </div>
    );
}
