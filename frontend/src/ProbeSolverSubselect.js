import React, { useEffect } from 'react';
import { Container, Label, Column, Row, Loader, Alert } from './common';
import textVals from './common/textVals';

export default function ProbeSolverSubselect(props) {

    const { processData, setSelectedSequences } = props;

    const [hardErrorValue, setHardErrorValue] = React.useState([]);
    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [data, setData] = React.useState(undefined);
    const [showMores, setShowMores] = React.useState([]);

    const oneSequenceSelected = (sequenceList) => {
        for (let sequence of sequenceList){
            if (sequence.active === true) return true;
        }
        return false;
    };

    const submitQuery = () => {
        if (isLoading) return;
        for (let strain of data.subSelect){
            if (strain.sequenceList.length === 0) continue;
            if (!oneSequenceSelected(strain.sequenceList)){
                setErrorValue(textVals.unselectedSequences);
                return;
            }
        }
        setErrorValue("");
        setIsLoading(true);

        const request = {
            jid: data.jid,
            selection: [],
        }
        
        for (let strain of data.subSelect) {
            for (let sequence of strain.sequenceList){
                if (!sequence.active) continue;
                request.selection.push({for: strain.for, id: sequence.id});
                break;
            }
        }

        const requestParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: 'default',
            body: JSON.stringify(request),
        };
        
        fetch(textVals.apiUrl + "setJobMarkers", requestParams)
            .then((response) => response.json())
            .then((response) => {
                if (response === undefined) return;
                setSelectedSequences({...data, selected: request.selection});
            })
            .catch((reason) => {
                console.log(reason);
                setErrorValue(textVals.failedFetch);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        setData(processData);
        const newShowMores = Array(processData.subSelect.length).fill(false); // array of subSelect length filled with false
        setShowMores(newShowMores);

        let hardErrorText = [];
        for (let i = 0, n = processData.subSelect.length; i < n; i++){
            let strain = processData.subSelect[i];
            if (strain.sequenceList.length !== 0) continue;
            hardErrorText.push(`Strain ${strain.name} (${processData.request.strainIds[i]}) did not output any marker sequences.`);
        }
        setHardErrorValue(hardErrorText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleSelect = (strain, index) => {
        if (isLoading) return;
        const newResults = {...data};
        newResults.subSelect[strain].sequenceList.forEach((item)=>item.active = false);
        newResults.subSelect[strain].sequenceList[index].active = true;

        setData(newResults);
    };

    const showMore = (strain) => {
        const newShowMores = [...showMores];
        newShowMores[strain] = true;
        setShowMores(newShowMores);
    };
    if (data === undefined) return null;
    return (<>
        {hardErrorValue.length === 0 ? undefined : (<Alert red>
            {hardErrorValue.map((item) => (<p>{item}</p>))}
        </Alert>)}
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
        {data.subSelect.map((strain, indexS) => (<div key={indexS}>
            <Loader visible={isLoading} />
            <Container key={indexS}>
                <Column style={{flexGrow: 1}}>
                    <Label>{strain.name}</Label>
                    {strain.sequenceList.length === 0 ? (<span style={{alignSelf: "start"}}>No marker sequences found.</span>) : undefined}
                    {(showMores[indexS] ? strain.sequenceList : strain.sequenceList.slice(0, 3)).map((item, indexI)=>(
                        <Row key={item.id} className={"resultRow" + (item.active ? " active" : "")}>
                            <div className={"selectResult" + (item.active ? " active" : "")} onClick={()=>toggleSelect(indexS, indexI)}>
                                <div className="title">{item.title}</div>
                                <div className={"eval eval" + item.seq_eval}>
                                    <span>{item.id}</span><span>{item.bac_name}</span><span>{item.length}bp</span>
                                </div>
                            </div>
                        </Row>
                    ))}
                    {(showMores[indexS] || strain.sequenceList.length <= 3) ? undefined : <button className="buttonBase" onClick={()=>showMore(indexS)}>Show more...</button>}
                </Column>
            </Container>
            <button disabled={isLoading} onClick={submitQuery} className="searchButton"><span>Search</span></button>
        </div>))}
    </>)
}