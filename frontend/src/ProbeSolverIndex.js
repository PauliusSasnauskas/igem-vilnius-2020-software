import React from 'react';
import { Container, Switch, Label, Number, MultipleInput } from './common';

import './ProbeSolverIndex.scss';


const Column = (props) => <div className="flexColumn" {...props}>{props.children}</div>;
// const Row = (props) => <div className="flexRow" {...props}>{props.children}</div>;

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
                    onChange={setAdvancedOption}
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
            <Column style={{padding: 16}}>
                <Label>Strain ID</Label>
                <MultipleInput
                    hint={"11111111"}
                    data={strainIds}
                    onChange={setStrainIds} />
            </Column>
        </Container>
        <Container>
            <Number number={3} /> 
            <Column>
                Hello
            </Column>
        </Container>
    </>);
}