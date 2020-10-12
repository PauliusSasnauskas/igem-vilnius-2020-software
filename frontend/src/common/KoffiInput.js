import React from 'react';
import Autocomplete from './Autocomplete';
import textVals from './textVals';

export default function NumberInput(props){

    const fetchData = async () => {

		fetch(textVals.koffiDb).then((result)=>{
			return result.json();
		}).then((data)=>{
			console.log(data);
			setMolData(data);
			setMolType(data.results.map(a => a.partner_A).filter(x => x).sort().filter((item, pos, ary) => {
				return !pos || item !== ary[pos - 1];
			}));
		});
		
	};


    const {label, parameterName, setOpenInfoPopup, molType, setMolData, setMolType, ...other} = props;

    return (<div className="koffiInput" {...other}>
        <span>{label}</span>
        <button onClick={() => setOpenInfoPopup(parameterName)} className="infoButton">
            <span>?</span>
        </button>
        <Autocomplete suggestions={molType} />
        <button onClick={fetchData}>Search</button>
    </div>);
}