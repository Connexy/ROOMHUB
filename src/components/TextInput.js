import React from 'react'

export default function TextInput(props) {
    return (
        <>
            <div class="input-box">
                <i class={props.logo}></i>
                <label for={props.name}>{props.label}</label>
                <input type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.handleInputChange}
                    {...props}
                />
            </div>
        </>
    )
}

