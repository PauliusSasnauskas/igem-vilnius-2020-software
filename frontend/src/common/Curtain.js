import React from 'react';
import Info from './Info';

export default function Curtain(props){
    const { inline, visible, type, setIsOverlaying, ...other } = props;
    return (<div className={"screenCurtain" + (visible ? " visible" : "")} {...other}>
        <Info visible={visible} type={type} setIsOverlaying={setIsOverlaying}/>
    </div>);
}