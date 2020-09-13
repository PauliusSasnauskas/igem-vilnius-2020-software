import React from 'react';

export default function NumberInput(props){

    const changeCurrentValue = (e) => {
        let _value = e.target.value;
        if (!_value.match("^\\d*\\.?\\d*$")) return; // check if has only numbers and a single decimal separator
        setParameter(parameterName, _value);
    };

    const {label, unit, value, parameterName, setParameter, setOpenInfoPopup, ...other} = props;

    return (<div className="numberInput" {...other}>
        <span>{label}</span>
        <button onClick={() => setOpenInfoPopup(parameterName)} className="infoButton">
            <span>?</span>
        </button>
        <input type="text" value={value ?? ""} onChange={changeCurrentValue} />
        <span>{unit}</span>
    </div>);
}