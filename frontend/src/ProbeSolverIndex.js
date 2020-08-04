import React from 'react';
import { Container, Switch, Label, Number, MultipleInput, NumberInput, Checkbox, MultipleInputDropdown } from './common';

import './ProbeSolverIndex.scss';


const Column = (props) => <div className="flexColumn" {...props}>{props.children}</div>;
const Row = (props) => <div className="flexRow" {...props}>{props.children}</div>;

export default function ProbeSolverIndex(props){

    const switchLightDarkMode = (e) => {
        document.body.classList.toggle("light");
        if (document.body.classList.contains("light")){
            e.target.innerText = "Dark mode";
        }else{
            e.target.innerText = "Light mode";
        }
    }

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

    return (<>
        <button className="modeSwitch" onClick={switchLightDarkMode}>Light mode</button>
        <a href="docs.html" className="docsButton">Docs</a>
        <h1 className="title">
            ProbeSolver
        </h1>
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
    </>);
};