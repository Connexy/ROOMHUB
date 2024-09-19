import React from 'react'

export default function PasswordInput(props) {
    return (
        <>
            <div className="input-box">
                <i className={props.logo}></i>
                <label for={props.name}>{props.label}</label>
                <input
                    type='password'
                    name={props.name}
                    value={props.value}
                    onChange={props.handleInputChange}
                    {...props}
                />
            </div>
        </>
    )
}

