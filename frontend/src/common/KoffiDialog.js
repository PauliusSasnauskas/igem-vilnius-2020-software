import React, { useEffect, useState } from 'react';
import Autocomplete from './Autocomplete';
import textVals from './textVals';

export default function KoffiDialog(props){
    const { setOpenKoffiDialog, setRatesFromDb, ...other } = props;

    const [koffiData, setKoffiData] = React.useState([]);

    const closePopup = () => {
        setOpenKoffiDialog(false);
    };

    // TODO: call this function when rates found
    const setRates = () => {
        setRatesFromDb({
            assocRate: 1000000,
            dissocRate: 0.001,
        });
    };

    const fetchData = async () => {
		fetch(textVals.apiUrl + "koffi").then((result)=>{
			return result.json();
		}).then((data)=>{
            setKoffiData(data);
		});
    };

    useEffect(() => {
        fetchData();
    });
    
    return (<div className="info" {...other}>
        <span onClick={closePopup}>✕</span>
        <h1>Get Rates from KoffiDB</h1>
        <Autocomplete suggestions={koffiData} />
    </div>);
}