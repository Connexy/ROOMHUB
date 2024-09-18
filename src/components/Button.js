import React from 'react'

export default function Button(props) {
    return (
        <>
            <button class="btn"
                id={props.id}
            >
                {props.name}
            </button>
        </>
    )
}
