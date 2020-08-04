import React from 'react';

export default function Label(props){
    return (<div className="label" {...props}>
        {props.children}
    </div>);
}