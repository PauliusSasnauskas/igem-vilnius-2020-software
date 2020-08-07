import React from 'react';
import { Container, Switch, Label, Number, MultipleInput, NumberInput, Checkbox, MultipleInputDropdown, Column } from './common';

const Row = (props) => <div className="flexRow" {...props}>{props.children}</div>;

export default function ProbeSolverIndex(props){
    const { increaseWindowState } = props;

    const [advancedOption, setAdvancedOption] = React.useState(false);
    const [probesPrimers, setProbesPrimers] = React.useState(false);
    const [strainIds, setStrainIds] = React.useState([]);
    const [taxIds, setTaxIds] = React.useState([]);
    const [advancedSectionEnabled, setAdvancedSectionEnabled] = React.useState(false);
    const [minLength, setMinLength] = React.useState(undefined);
    const [maxLength, setMaxLength] = React.useState(undefined);
    const [excludeIntergenic, setExcludeIntergenic] = React.useState(false);
    const [sequenceTypes, setSequenceTypes] = React.useState([]);

    const setAdvancedOptionAndEnableSection = (value) => {
        setAdvancedOption(value);
        if (value) setAdvancedSectionEnabled(true);
    };

    const submitQuery = () => {
        const request = {
            thing: "what"
            // actual request data
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
        
        fetch("http://127.0.0.1:5000/api/createJob", requestParams)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                increaseWindowState();
            }).catch((reason)=>{
                // cope with failiure
                console.log(reason);
            });
    };

    return (<>
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
                    value={probesPrimers}
                    onChange={setProbesPrimers}
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
                <Label>Taxonomy ID</Label>
                <MultipleInput
                    hint="Enter taxonomy ID..."
                    data={taxIds}
                    onChange={setTaxIds} />
                <br />
                <Label>Marker sequence length</Label>
                <Row style={{justifyContent: "space-between", width: "100%", margin: "8px 0 16px"}}>
                    <NumberInput
                        style={{width: "48%"}}
                        label="Min"
                        value={minLength}
                        onChange={setMinLength} />
                    <NumberInput
                        style={{width: "48%"}}
                        label="Max"
                        value={maxLength}
                        onChange={setMaxLength} />
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