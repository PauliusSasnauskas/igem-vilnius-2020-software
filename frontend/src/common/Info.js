import React from 'react';
import { default as info } from '../assets/db';


export default function Info(props){
    const { visible, type, setIsOverlaying, ...other } = props;

    let title, desc;
    if (visible && type !== "loader"){
        let kind = type.replace(' info', '');
        let infoText = info[kind];
        title = infoText.title;
        desc = infoText.desc
    }
    const closePopup = () => {
        setIsOverlaying(false);
    };
    
    
    return (<div className={type + (visible ? " visible" : "")} {...other}>
        <span className={(visible ? " visible" : "")} onClick={closePopup}>x</span>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>);
}