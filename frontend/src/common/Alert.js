import React from 'react';

export default function Alert(props) {
    return (<div className="container warning" {...props}>
        {props.children}
    </div>);
}