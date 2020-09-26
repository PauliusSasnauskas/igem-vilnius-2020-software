import React from 'react';
import { Container, Alert} from './common';

export default function LFAModelIndex(props){
    const {request, response, back} = props;
    
    const [errorValue, setErrorValue] = React.useState("");

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}

        <Container>
            Parameters:<br/>
            Capillary Flow Rate: {request.flowRate} s/4cm<br/>
            Diffusion Coefficient: {request.diffusCoef}<br/>
            Analyte concentration: {request.aCoef} μM<br/>
            Detection probe concentration: {request.pCoef} μM<br/>
            Test probe concentration: {request.rCoef} μM<br/>
            Association rate: {request.assocRate} 1/s<br/>
            Dissociation rate: {request.dissocRate} 1/s<br/>
        </Container>
        <Container>
            Test line distance: {response.dist}<br />
            Process (reaction) time: {response.time}<br />
            Optimal volume of the sample: {response.samplevol}
        </Container>
        
        <Container>
            <button onClick={back} className="backButton"><span>Back</span></button>
        </Container>
    </>);
};