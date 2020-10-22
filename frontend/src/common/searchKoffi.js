import React from 'react';
import Autocomplete from './Autocomplete';

export default function SearchKoffi(props){

    const {label, molType, parameterName, setOpenInfoPopup, ...other} = props;

    return (<div className="numberInput" {...other}>
        <span>{label}</span>
        <button onClick={() => setOpenInfoPopup(parameterName)} className="infoButton">
            <span>?</span>
        </button>
        <Autocomplete suggestions={molType} />
    </div>);
}