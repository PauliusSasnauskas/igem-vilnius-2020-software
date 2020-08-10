import React from 'react';


export default function Row(props){
    const {className, ...other} = props;
    return (<div className={"flexRow" + (className !== undefined ? " "+className : "")} {...other}>{props.children}</div>);
}