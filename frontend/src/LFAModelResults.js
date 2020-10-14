import React from 'react';
import { Container, Alert, Curtain, Info, Column } from './common';
import NumberOutput from './common/NumberOutput';

export default function LFAModelIndex(props){
    const {request, response, back} = props;
    
    const [errorValue, setErrorValue] = React.useState("");

    const [openInfoPopup, setOpenInfoPopup] = React.useState("");
    
    const testLineDistance = Math.round(response.dist*10000)/100;
    const processTimeMinutes = Math.trunc(response.time/60);
    const processTimeSeconds = response.time%60;
    const optimalValue = response.samplevol;

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}

		<Curtain visible={openInfoPopup !== ""}>
			<Info type={openInfoPopup} setOpenInfoPopup={setOpenInfoPopup} />
		</Curtain>

        <Container>
            <Column>
                <h1>Input</h1>
                
                <NumberOutput
                    label="Capillary Flow Rate"
                    unit="s/4cm"
                    value={request.flowRate}
                    parameterName="flowRate"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="Diffusion Coefficient"
                    unit=""
                    value={request.diffusCoef}
                    parameterName="diffusCoef"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="Analyte concentration"
                    unit="μM"
                    value={request.aCoef}
                    parameterName="aCoef"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="Detection probe concentration"
                    unit="μM"
                    value={request.pCoef}
                    parameterName="pCoef"
                    setOpenInfoPopup={setOpenInfoPopup} />

                <NumberOutput
                    label="Capture probe concentration"
                    unit="μM"
                    value={request.rCoef}
                    parameterName="rCoef"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="Association rate"
                    unit="1/s"
                    value={request.assocRate}
                    parameterName="assocRate"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="Dissociation rate"
                    unit="1/s"
                    value={request.dissocRate}
                    parameterName="dissocRate"
                    setOpenInfoPopup={setOpenInfoPopup} />
            </Column>
        </Container>
        <Container style={{boxShadow: "0px 6px 15px 2px #6281EF", border: "4px solid #6281EF"}}>
            <Column>
                <h1>Output</h1>
                <NumberOutput
                    label="Test line distance"
                    unit="cm"
                    value={testLineDistance} />
                <NumberOutput
                    label="Process (reaction) time"
                    unit=""
                    value={processTimeMinutes + " min " + processTimeSeconds + " s"} />
                <NumberOutput
                    label="Optimal volume of the sample"
                    unit="μl"
                    value={optimalValue} />
            </Column>
        </Container>
        
        <Container>
            <button onClick={back} className="backButton"><span>Back</span></button>
        </Container>
    </>);
};