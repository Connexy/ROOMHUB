import React from 'react';

export default function FileInput(props) {
    return (
        <>
            <div className="input-box">
                <label htmlFor={props.name}>{props.label}</label>
                <i className={props.logo}></i>
                <input
                    type="file"
                    name={props.name}
                    accept="image/*"
                    onChange={props.onChange}
                    {...props}
                />
                {props.errorMessage && <span className="label-danger" style={{ fontSize: "12px" }}>{props.errorMessage}</span>}
            </div>
        </>
    );
}
