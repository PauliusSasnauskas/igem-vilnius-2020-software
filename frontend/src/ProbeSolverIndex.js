import React from 'react';
import { Container, Switch, Label, Number, MultipleInput, Checkbox, MultipleInputDropdownMinMax, Column, Alert, Loader } from './common';
import textVals from './common/textVals';

export default function ProbeSolverIndex(props){
    const { setSubResults } = props;

    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [advancedOption, setAdvancedOption] = React.useState(false);
    const [isProbe, setIsProbe] = React.useState(false);
    const [strainIds, setStrainIds] = React.useState([]);
    const [taxIds, setTaxIds] = React.useState([]);
    const [advancedSectionEnabled, setAdvancedSectionEnabled] = React.useState(false);
    const [excludeIntergenic, setExcludeIntergenic] = React.useState(false);
    const [sequenceTypes, setSequenceTypes] = React.useState([]);


    const setAdvancedOptionAndEnableSection = (value) => {
        setAdvancedOption(value);
        if (value) setAdvancedSectionEnabled(true);
    };

    const submitQuery = () => {
        if (isLoading) return;
        setErrorValue("");

        if (strainIds.length === 0){
            setErrorValue(textVals.noStrainIds);
            return;
        }
        if (taxIds.length === 0){
            setErrorValue(textVals.noTaxIds);
            return;
        }

        setIsLoading(true);

        // send request
        const request = {
            isProbe,
            strainIds,
            taxIds,
            excludeIntergenic,
            sequenceTypes,
        };
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
        
        // TODO: replace with actual api url
        fetch("http://127.0.0.1:5000/api/createJob", requestParams)
            .then((response) => response.json())
            .then((data) => {
                if (data === undefined) return;
                setSubResults(data);
            })
            .catch((reason) => {
                console.log(reason);
                setErrorValue(textVals.failedFetch);
                setIsLoading(false);
            });
    };

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
        {isLoading ? <Loader /> : undefined}
        <Container>
            <Number number={1} />
            <Column>
                <Switch
                    textFalse="Default"
                    textTrue="Advanced"
                    value={advancedOption}
                    onChange={setAdvancedOptionAndEnableSection}
                    style={{marginBottom: 16}}/>
                <Switch
                    textFalse="Probes"
                    textTrue="Primers"
                    value={isProbe}
                    onChange={setIsProbe}
                    />
            </Column>
        </Container>
        <Container>
            <Number number={2} />
            <Column style={{padding: "0 16px"}}>
                <Label>Strain ID</Label>
                <MultipleInput
                    hint="Enter strain ID..."
                    data={strainIds}
                    onChange={setStrainIds} />
                <br />
                <Label>Taxonomy ID</Label>
                <MultipleInput
                    numbersOnly
                    hint="Enter taxonomy ID..."
                    data={taxIds}
                    onChange={setTaxIds} />
            </Column>
        </Container>
        <div style={{textAlign: "center"}}><button
            onClick={()=>setAdvancedSectionEnabled(!advancedSectionEnabled)}
            className={"advancedButton " + (advancedSectionEnabled ? "enabled" : "")}>
            Advanced settings
        </button></div>
        <Container style={!advancedSectionEnabled ? {display: "none"} : undefined}>
            <Number number={3} />
            <Column style={{padding: "0 16px"}}>
                <Checkbox
                    style={{alignSelf: "start"}}
                    label="Exclude intergenic sequences"
                    value={excludeIntergenic}
                    onChange={setExcludeIntergenic} />
                <br />
                <MultipleInputDropdownMinMax
                    setErrorValue={setErrorValue}
                    hint="Choose type..."
                    data={sequenceTypes}
                    onChange={setSequenceTypes} />
            </Column>
        </Container>
        <button disabled={isLoading} onClick={submitQuery} className="searchButton"><span>Search</span></button>
    </>);
};