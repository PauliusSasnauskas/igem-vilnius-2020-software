import React, { useEffect } from 'react';
import { Container, Alert, Curtain, Info, Column } from './common';
import NumberOutput from './common/NumberOutput';

export default function LFAModelIndex(props){
    const {request, response, back} = props;
    
    const [errorValue, setErrorValue] = React.useState("");

	const [openInfoPopup, setOpenInfoPopup] = React.useState("");
	
	const [openOptionalParameters, setOpenOptionalParameters] = React.useState(false);
    
    const testLineDistance = Math.round(response.dist*10000)/100;
    const processTimeMinutes = Math.trunc(response.time/60);
    const processTimeSeconds = response.time%60;
    const optimalValue = response.samplevol;

    const outputRef = React.useRef(null);

    useEffect(()=>{
        window.scrollTo(0, outputRef.current.offsetTop);
    }, [outputRef]);

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}

		<Curtain visible={openInfoPopup !== ""}>
			<Info type={openInfoPopup} setOpenInfoPopup={setOpenInfoPopup} />
		</Curtain>

        <h1>Input</h1>

        <Container>
			<Column>
				<NumberOutput
					label="Signal Threshold"
					unit=""
					parameterName="signalThreshold"
					value={request.signalThreshold}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberOutput
					label="Capillary Flow Rate"
					unit="s/4cm"
					parameterName="flowRate"
					value={request.flowRate}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<h3>Nitrocellulose Membrane Parameters</h3>
				<NumberOutput
					label="Length"
					unit="mm"
					parameterName="length"
					value={request.length}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberOutput
					label="Width"
					unit="mm"
					parameterName="width"
					value={request.width}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberOutput
					label="Thickness"
					unit="mm"
					parameterName="thickness"
					value={request.thickness}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<h3>Initial Concentrations</h3>
				<NumberOutput
					label="Analyte"
					unit="μM"
					parameterName="aCoef"
					value={request.aCoef}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberOutput
					label="Detection Probe"
					unit="μM"
					parameterName="pCoef"
					value={request.pCoef}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberOutput
					label="Capture Probe"
					unit="μM"
					parameterName="rCoef"
					value={request.rCoef}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>

		{!openOptionalParameters ? (
			<Container><button onClick={()=>setOpenOptionalParameters(true)} className="submitButton optionalButton">Optional Parameters</button></Container>
		) : (<>
			<h2>Optional Parameters</h2>
			<Container>
				<Column>
					<h3>Capilary Flow</h3>
					<NumberOutput
						label="Initial Velocity"
						unit="s/4cm"
						parameterName="initVelocity"
						value={request.initVelocity}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="Velocity Decay Rate"
						unit="1/s"
						parameterName="velocityDecay"
						value={request.velocityDecay}
						setOpenInfoPopup={setOpenInfoPopup} />
				</Column>
			</Container>
			<Container>
				<Column>
					<h3>Diffusion Coefficients</h3>
					<NumberOutput
						label="Analyte"
						unit="m²/s"
						parameterName="diffusCoef"
						value={request.diffusCoef}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="Probe"
						unit="m²/s"
						parameterName="probeDiffusCoef"
						value={request.probeDiffusCoef}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="Complex"
						unit="m²/s"
						parameterName="complexDiffusCoef"
						value={request.complexDiffusCoef}
						setOpenInfoPopup={setOpenInfoPopup} />
				</Column>
			</Container>
			<Container>
				<Column>
					<h3>Reaction Rates</h3>
					<NumberOutput
						label="A+P Association rate"
						unit="1/s"
						parameterName="assocRate1"
						value={request.assocRate1}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="A+P Dissociation rate"
						unit="1/s"
						parameterName="dissocRate1"
						value={request.dissocRate1}
						setOpenInfoPopup={setOpenInfoPopup} />
					<br /><br />
					<NumberOutput
						label="AP+R Association rate"
						unit="1/s"
						parameterName="assocRate2"
						value={request.assocRate2}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="AP+R Dissociation rate"
						unit="1/s"
						parameterName="dissocRate2"
						value={request.dissocRate2}
						setOpenInfoPopup={setOpenInfoPopup} />
					<br /><br />
					<NumberOutput
						label="P+R Association rate"
						unit="1/s"
						parameterName="assocRate3"
						value={request.assocRate3}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="P+R Dissociation rate"
						unit="1/s"
						parameterName="dissocRate3"
						value={request.dissocRate3}
						setOpenInfoPopup={setOpenInfoPopup} />
						<br /><br />
					<NumberOutput
						label="A+R Association rate"
						unit="1/s"
						parameterName="assocRate4"
						value={request.assocRate4}
						setOpenInfoPopup={setOpenInfoPopup} />
					<NumberOutput
						label="A+R Dissociation rate"
						unit="1/s"
						parameterName="dissocRate4"
						value={request.dissocRate4}
						setOpenInfoPopup={setOpenInfoPopup} />
				</Column>
			</Container>
		</>)}

        <Container className="output">
            <Column>
                <h1 ref={outputRef}>Output</h1>
                <NumberOutput
                    label="Test line distance"
                    unit="cm"
                    value={testLineDistance} />
                <NumberOutput
                    label="Process (reaction) time"
                    unit=""
                    value={processTimeMinutes + " min " + processTimeSeconds + " s"} />
            </Column>
        </Container>
        
        <Container>
            <button onClick={back} className="backButton"><span>Back</span></button>
        </Container>
    </>);
};