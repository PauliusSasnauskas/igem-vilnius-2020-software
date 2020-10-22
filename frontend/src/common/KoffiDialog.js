import React, { useEffect } from 'react';
import Autocomplete from './Autocomplete';
import debugData from './debugKoffi';

export default function KoffiDialog(props){
    const { setOpenKoffiDialog, setRatesFromDb, ...other } = props;

    const [koffiData, setKoffiData] = React.useState(undefined);

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
		// fetch(textVals.apiUrl + "koffi").then((result)=>{
		// 	return result.json();
		// }).then((data)=>{
        //     console.log(data);
        //     setKoffiData(data);
        // });

        // DEBUG:
        setKoffiData(debugData);
    };

    const suggestions = koffiData === undefined ? [] : koffiData.results.map((item) => {
        return {id: item.id, partner_A: item.partner_A, partner_B: item.partner_B, kon: item.kon, koff: item.koff};
    }).filter((item)=>{
        if (item.kon === null && item.koff === null) return false;
        return true;
    });

    const setSelectedFirst = (id) => {
        console.log(suggestions.find((x)=>(x.id === id)));
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (<div className="info koffiInfo" {...other}>
        <span onClick={closePopup}>✕</span>
        <h1>Get Rates from KoffiDB</h1>
        {koffiData !== undefined ? <Autocomplete suggestions={suggestions} setSelected={setSelectedFirst} /> : null}
    </div>);
}