import React from 'react';

export default function Curtain(props){
    const { visible, children, ...other } = props;;

    return (<div className={"screenCurtain" + (visible ? " visible" : "")} {...other}>
        {children}
    </div>);
}