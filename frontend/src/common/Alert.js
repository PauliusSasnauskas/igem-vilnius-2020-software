import React from 'react';

export default function Alert(props) {
    const {red, ...other} = props
    return (<div className={"container warning" + (red ? " red" : "")} {...other}>
        {props.children}
    </div>);
}