import React from 'react';
import { Container, Switch, Label, Number, MultipleInput, NumberInput, Checkbox, MultipleInputDropdown, Column, Alert } from './common';

const Row = (props) => <div className="flexRow" {...props}>{props.children}</div>;

const textVals = {
    minMaxConstraint: "Min length must be smaller than max length.",
    maxMinConstraint: "Max length must be larger than min length.",
    noStrainIds: "Please input a strain ID. (Maybe you forgot to click the (+) button?)",
    noTaxIds: "Please input a tax ID. (Maybe you forgot to click the (+) button?)",
};

export default function ProbeSolverIndex(props){
    const { setJobId } = props;

    const [errorValue, setErrorValue] = React.useState("");

    const [advancedOption, setAdvancedOption] = React.useState(false);
    const [isProbe, setIsProbe] = React.useState(false);
    const [strainIds, setStrainIds] = React.useState([]);
    const [taxIds, setTaxIds] = React.useState([]);
    const [advancedSectionEnabled, setAdvancedSectionEnabled] = React.useState(false);
    const [minLength, setMinLength] = React.useState(undefined);
    const [maxLength, setMaxLength] = React.useState(undefined);
    const [excludeIntergenic, setExcludeIntergenic] = React.useState(false);
    const [sequenceTypes, setSequenceTypes] = React.useState([]);

    const changeMinLength = (newVal) => {
        setMinLength(newVal);
        if (maxLength !== undefined && newVal > maxLength){
            setErrorValue(textVals.minMaxConstraint);
        }else{
            setErrorValue("");
        }
    };
    const changeMaxLength = (newVal) => {
        setMaxLength(newVal);
        if (minLength !== undefined && newVal < minLength){
            setErrorValue(textVals.maxMinConstraint);
        }else{
            setErrorValue("");
        }
    }

    const setAdvancedOptionAndEnableSection = (value) => {
        setAdvancedOption(value);
        if (value) setAdvancedSectionEnabled(true);
    };

    const submitQuery = () => {
        setErrorValue("");

        if (strainIds.length === 0){
            setErrorValue(textVals.noStrainIds);
            return;
        }
        if (taxIds.length === 0){
            setErrorValue(textVals.noTaxIds);
            return;
        }

        // send request
        const request = {
            isProbe,
            strainIds,
            taxIds,
            minLength,
            maxLength,
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
                setJobId(data.jobId);
            }).catch((reason)=>{
                // cope with failiure
                console.log(reason);
            });
    };

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
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
                <Label>Marker sequence length</Label>
                <Row style={{justifyContent: "space-between", width: "100%", margin: "8px 0 16px"}}>
                    <NumberInput
                        style={{width: "48%"}}
                        label="Min"
                        value={minLength}
                        onChange={changeMinLength} />
                    <NumberInput
                        style={{width: "48%"}}
                        label="Max"
                        value={maxLength}
                        onChange={changeMaxLength} />
                </Row>
                <Checkbox
                    style={{alignSelf: "start"}}
                    label="Exclude intergenic sequences"
                    value={excludeIntergenic}
                    onChange={setExcludeIntergenic} />
                <br />
                <Label>Marker sequence type</Label>
                <MultipleInputDropdown
                    hint="Choose type..."
                    data={sequenceTypes}
                    onChange={setSequenceTypes} />
            </Column>
        </Container>
        <button onClick={submitQuery} className="searchButton"><span>Search</span></button>
    </>);
};