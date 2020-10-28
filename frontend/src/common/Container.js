import React from 'react';

export default function Container(props){
    const {className, children, ...other} = props;
    return (<div className={"container" + (className !== undefined ? " " + className : "")} {...other}>
        {children}
    </div>);
}