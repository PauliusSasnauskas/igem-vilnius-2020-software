import React, { useEffect } from 'react';
import Autocomplete from './Autocomplete';
import Curtain from './Curtain';
import Loader from './Loader';
// import debugData from './debugKoffi';
import textVals from './textVals';

export default function KoffiDialog(props){
    const { setOpenKoffiDialog, setRatesFromDb, ...other } = props;

    const [koffiData, setKoffiData] = React.useState(undefined);

    const [selectedFirst, setSelectedFirst] = React.useState(undefined);
    const [selectedSecond, setSelectedSecond] = React.useState(undefined);

    const closePopup = () => {
        setOpenKoffiDialog(false);
    };

    const fetchData = async () => {
		fetch(textVals.apiUrl + "koffi").then((result)=>{
			return result.json();
		}).then((data)=>{
            setKoffiData(data);
        });

        // DEBUG:
        // setKoffiData(debugData);
    };

    const suggestions = koffiData === undefined ? [] : koffiData.results.map((item) => {
        return {id: item.id, partner_A: item.partner_A, partner_B: item.partner_B, kon: item.kon, koff: item.koff};
    }).filter((item)=>{
        if (item.kon === null && item.koff === null) return false;
        return true;
    });

    const checkFirst = (item) => item.partner_A === selectedFirst;


    useEffect(() => {
        fetchData();
    }, []);

    const selectedItem = (selectedFirst === undefined || selectedSecond === undefined) ? undefined :
            suggestions.filter((item)=>{
                return item.partner_A === selectedFirst && item.partner_B === selectedSecond
            });

    const setCoeff = (number) => () => {
        setRatesFromDb({
            ["assocRate" + number]: selectedItem[0].kon,
            ["dissocRate" + number]: selectedItem[0].koff,
        });
    };


    return (<div className="info koffiInfo" {...other}>
        <span onClick={closePopup}>✕</span>
        <h1>Get Rates from KoffiDB</h1>
        {koffiData !== undefined ?
            (<div>
                <div className="row">
                    <Autocomplete
                        suggestions={suggestions}
                        childParam="partner_A"
                        setSelected={setSelectedFirst} />
                    <span>{selectedFirst ?? null}</span>
                </div>
                <div className="row">
                    <Autocomplete
                        disabled={selectedFirst === undefined}
                        suggestions={suggestions}
                        childParam="partner_B"
                        setSelected={setSelectedSecond}
                        filterCondition={checkFirst} />
                    <span>{selectedSecond ?? null}</span>
                </div>
                <br />
                {selectedItem !== undefined && selectedItem.length > 0 ? (<>
                    <div className="coefficient">Association rate: {selectedItem[0].kon}</div>
                    <div className="coefficient">Dissociation rate: {selectedItem[0].koff}</div>
                    <br />
                    <b>Set this as:</b>
                    <button onClick={setCoeff(1)}>A+P</button>
                    <button onClick={setCoeff(2)}>AP+R</button>
                    <button onClick={setCoeff(3)}>P+R</button>
                    <button onClick={setCoeff(4)}>A+R</button>
                </>) : null}
            </div>)
        :
            (<Loader visible />)
        }
    </div>);
}