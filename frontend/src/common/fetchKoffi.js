import React from 'react';
import textVals from './textVals';

export default function FetchKoffi(props){

    const fetchData = async () => {

		fetch(textVals.apiUrl + "koffi").then((result)=>{
			return result.json();
		}).then((data)=>{
			console.log(data);
			setMolData(data);
			setMolType(data.results.map(a => a.partner_A).filter(x => x).sort().filter((item, pos, ary) => {
				return !pos || item !== ary[pos - 1];
			}));
		});
		
    };
    const initiateDatabaseSearch = ()=>{
        setOpenInfoPopup(parameterName, molType);
        fetchData()
    }


    const {label, parameterName, setRatesFromDb, setOpenInfoPopup, molType, setMolData, setMolType, ...other} = props;

    // TODO: call this function when rates found
    const setRates = () => {
        setRatesFromDb({
            assocRate: 1000000,
            dissocRate: 0.001,
        });
    };

    return (<div className="fetchKoffi" {...other}>
        <button onClick={initiateDatabaseSearch}>Search the database</button>
    </div>);
}