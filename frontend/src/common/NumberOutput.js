import React from 'react';

export default function NumberOutput(props){

    const {label, unit, value, parameterName, setOpenInfoPopup, ...other} = props;

    return (<div className="numberOutput" {...other}>
        <span>{label}</span>
        {setOpenInfoPopup !== undefined || parameterName !== undefined ? <button onClick={() => setOpenInfoPopup(parameterName)} className="infoButton">
            <span>?</span>
        </button> : null}
        <span className="value">{value}</span>
        <span>{unit}</span>
    </div>);
}