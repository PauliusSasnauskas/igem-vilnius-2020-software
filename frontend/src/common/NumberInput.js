import React from 'react';

export default function NumberInput(props){

    const changeCurrentValue = (e) => {
        let _value = e.target.value;
        if (!_value.match("^\\d*\\.?\\d*$")) return;
        setParameter(parameterName, _value);
    };

    const {label, value, parameterName, setParameter, ...other} = props;

    return (<div className="numberInput" {...other}>
        <label>
            <span>{label}</span>
            <input type="text" value={value ?? ""} onChange={changeCurrentValue} />
        </label>
    </div>);
}