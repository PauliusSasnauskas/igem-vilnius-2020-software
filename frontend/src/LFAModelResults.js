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
                    label="A+P Association rate"
                    unit="1/s"
                    value={request.assocRate1}
                    parameterName="assocRate1"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="A+P Dissociation rate"
                    unit="1/s"
                    value={request.dissocRate1}
                    parameterName="dissocRate1"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="AP+R Association rate"
                    unit="1/s"
                    value={request.assocRate2}
                    parameterName="assocRate2"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="AP+R Dissociation rate"
                    unit="1/s"
                    value={request.dissocRate2}
                    parameterName="dissocRate2"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="P+R Association rate"
                    unit="1/s"
                    value={request.assocRate3}
                    parameterName="assocRate3"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="P+R Dissociation rate"
                    unit="1/s"
                    value={request.dissocRate3}
                    parameterName="dissocRate3"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="A+R Association rate"
                    unit="1/s"
                    value={request.assocRate4}
                    parameterName="assocRate4"
                    setOpenInfoPopup={setOpenInfoPopup} />
                <NumberOutput
                    label="A+R Dissociation rate"
                    unit="1/s"
                    value={request.dissocRate4}
                    parameterName="dissocRate4"
                    setOpenInfoPopup={setOpenInfoPopup} />
            </Column>
        </Container>
        <Container style={{boxShadow: "0px 6px 15px 2px #6281EF", border: "4px solid #6281EF", borderBottomWidth: "10px"}}>
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
                    label="Optimal amount of the sample"
                    unit="μmol"
                    value={optimalValue} />
            </Column>
        </Container>
        
        <Container>
            <button onClick={back} className="backButton"><span>Back</span></button>
        </Container>
    </>);
};