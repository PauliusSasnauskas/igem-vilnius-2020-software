import React from 'react';

export default function Switch(props){

    const {textFalse, textTrue, value, onChange, ...other} = props;

    const changeFunc = (e) => {
        onChange(e.target.checked);
    };

    return (<label className="switch" {...other}>
        <span className={!value ? "checked" : ""}>{textFalse}</span>
        <input type="checkbox" checked={value} onChange={changeFunc}/>
        <span className="slider"></span>
        <span className={value ? "checked" : ""}>{textTrue}</span>
    </label>);
}