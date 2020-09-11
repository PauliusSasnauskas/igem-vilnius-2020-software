import React from 'react';
import InfoButton from './InfoButton'

export default function NumberInput(props){

    const changeCurrentValue = (e) => {
        let _value = e.target.value;
        if (!_value.match("^\\d*\\.?\\d*$")) return;
        setParameter(parameterName, _value);
    };

    const {label, unit, value, parameterName, setParameter, setPopupType, setIsOverlaying, ...other} = props;

    return (<div className="numberInput" {...other}>
        <label>
            <span>{label}</span>
    <InfoButton paramType={parameterName} setPopupType={setPopupType} setIsOverlaying={setIsOverlaying}/>
            <input type="text" value={value ?? ""} onChange={changeCurrentValue} />
            <span>{unit}</span>
        </label>
    </div>);
}