import React, { useEffect } from 'react';
import { Container, Label, Column, Row, Loader, Alert } from './common';

export default function ProbeSolverSubselect(props) {

    const { processData } = props;

    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [data, setData] = React.useState(undefined);
    const [showMores, setShowMores] = React.useState([]);

    const submitQuery = () => {
        if (isLoading) return;
        setErrorValue("");
        
        setIsLoading(true);
    }

    useEffect(() => {
        setData(processData)
        const newShowMores = Array(processData.subSelect.length).fill(false); // array of subSelect length filled with false
        setShowMores(newShowMores);
    }, [processData]);

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
    return data.subSelect.map((strain, indexS) => (<div key={indexS}>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
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
    </div>));
}