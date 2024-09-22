import React from 'react';

export default function TextInput(props) {
    return (
        <>
            <div className="input-box">
                <label htmlFor={props.name}>{props.label}</label>
                <i className={props.logo}></i>
                <input
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    {...props}
                />
                {props.errorMessage && <span className="label-danger" style={{ fontSize: "12px" }}>{props.errorMessage}</span>}
            </div>
        </>
    );
}
