import React from 'react'

export default function PasswordInput(props) {
    return (
        <>
            <div class="input-box">
                <i class={props.logo}></i>
                <label for={props.name}>{props.label}</label>
                <input
                    type='password'
                    name={props.name}
                    value={props.value}
                    {...props}
                />
            </div>
        </>
    )
}

