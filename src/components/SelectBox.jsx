import React from 'react';

const SelectBox = (props) => {
    // Determine the placeholder text based on error state
    const dynamicPlaceholder = props.errorMessage || props.placeholder || "Select an option";

    return (
        <div className="input-box">
            <label htmlFor={props.name}>{props.label}</label>
            <i className={props.logo}></i>
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className={props.errorMessage ? 'error-select' : ''}
            >
                <option value="" disabled>
                    {dynamicPlaceholder}
                </option>
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox;
