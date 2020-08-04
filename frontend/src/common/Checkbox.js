import React from 'react';

export default function Checkbox(props){

    const {label, value, onChange, ...other} = props;

    const changeFunc = (e) => {
        console.log(e.target.checked);
        onChange(e.target.checked);
    };

    return (<label className="checkbox" {...other}>
        <input type="checkbox" value={value} onChange={changeFunc} />
        <span>{label}</span>
    </label>);
}