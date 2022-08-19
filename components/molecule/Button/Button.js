import React from 'react'
import "./styles.css"

function Button(props) {
    const size = ["font-primary","font-secondary","font-third","font-fourth"];
    const weight = ["weight-primary","weight-secondary"];
    const checksize = size.includes(props.headsize) ? props.headsize : size[0];
    const checkweight = weight.includes(props.headweight) ? props.headweight : weight[0];
    return (
        <>
            <button className={`${checksize} ${checkweight}`}>{props.content}</button>
        </>
    )
}

export default Button
