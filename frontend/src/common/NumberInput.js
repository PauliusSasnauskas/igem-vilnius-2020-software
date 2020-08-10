import React from 'react';

export default function NumberInput(props){

    const changeCurrentValue = (e) => {
        let value;
        if (e.target.value === undefined || e.target.value === ""){
            onChange(undefined);
            return;
        }
        try {
            value = parseInt(e.target.value);
            if (isNaN(value)) return;
        } catch (e) {
            return;
        }
        onChange(value);
    };

    const {label, value, onChange, ...other} = props;

    return (<div className="numberInput" {...other}>
        <label>
            <span>{label}</span>
            <input type="number" value={String(value !== undefined ? value : "")} onChange={changeCurrentValue} />
        </label>
    </div>);
}