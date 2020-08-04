import React from 'react';

export default function Number(props){
    return (<span className="number" {...props}>
        {props.number}.
    </span>);
}