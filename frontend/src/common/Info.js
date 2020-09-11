import React from 'react';
var DB = require('../assets/db');

export default function Info(props){
    const { visible, type, setIsOverlaying, ...other } = props;

    var title, desc = null;
    if(visible){
        var info = DB.info;
        var kind = type.replace(' info', '');
        var infoText = info[kind];
        title = infoText.title;
        desc = infoText.desc
    }
    const closePopup = () => {
setIsOverlaying(false)
    };
    
    
    return (<div className={type + (visible ? " visible" : "")} {...other}>
        <span className={(visible ? " visible" : "")} onClick={closePopup}>x</span>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>);
}