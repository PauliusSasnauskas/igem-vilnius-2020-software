import React from 'react';
import { Container, Column, Alert, Curtain, NumberInput } from './common';
import Loader from './common/Loader';
import Info from './common/Info';
import textVals from './common/textVals';
import KoffiDialog from './common/KoffiDialog';

export default function LFAModelIndex(props) {
	const { setRequest, setData } = props;

	const [errorValue, setErrorValue] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const [openInfoPopup, setOpenInfoPopup] = React.useState("");

	const [openKoffiDialog, setOpenKoffiDialog] = React.useState(false);

	const [parameters, setParameters] = React.useState({
		signalThreshold: "0.8",
		diffusCoef: "0.00000000001",
		probeDiffusCoef: "0.00000000001",
		complexDiffusCoef: "0.00000000001",
		aCoef: "0.01",
		pCoef: "0.01",
		rCoef: "0.01",
		flowRate: "180",
		initVelocity: "218.6",
		velocityDecay: "0.00855",
		length: "25",
		width: "6",
		thickness: "0.135",
		assocRate1: "1000000",
		dissocRate1: "0.001",
		assocRate2: "1000000",
		dissocRate2: "0.001",
		assocRate3: "1000000",
		dissocRate3: "0.001",
		assocRate4: "1000000",
		dissocRate4: "0.001",
	});

	const setParameter = (parameter, value) => {
		console.log("settingPar", parameter, value);
		setParameters({ ...parameters, [parameter]: value })
	};

	const submit = () => {
		if (openInfoPopup !== "") return;
		setErrorValue("");
		setIsLoading(true);

		// send request
		const request = {...parameters};

		for (let item in request){
			request[item] = parseFloat(request[item]);
		}

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

		let debug = true;
		if (debug){
			setRequest(request);
			setData({time: 740, dist: 0.03457215, samplevol: 19.98});
		}else{
			fetch(textVals.apiUrl + "calculate", requestParams)
				.then((response) => response.json())
				.then((data) => {
					if (data === undefined) return;
					setRequest(request);
					setData(data);
				})
				.catch((reason) => {
					console.log(reason);
					setErrorValue(textVals.failedFetch);
					setIsLoading(false);
				});
		}
	};

	const forceOpenKoffiDialog = ()=>{
		setOpenKoffiDialog(true);
	}

	const setRatesFromDb = (rates) => {
		let newPars = {};
		for (let rate in rates){
			newPars = {...newPars, [rate]: rates[rate]};
		}
		setParameters({ ...parameters, ...newPars })
	};

	return (<>
		{errorValue.trim().length === 0 ? undefined : (<Alert>
			{errorValue}
		</Alert>)}

		<Curtain visible={openInfoPopup !== ""}>
			<Info type={openInfoPopup} setOpenInfoPopup={setOpenInfoPopup} />
		</Curtain>

		
		<Curtain visible={openKoffiDialog}>
			{openKoffiDialog ?
				<KoffiDialog
					setOpenKoffiDialog={setOpenKoffiDialog}
					setRatesFromDb={setRatesFromDb} />
			: null}
		</Curtain>

		<Curtain visible={isLoading}>
			<Loader visible={isLoading} />
		</Curtain>
		<Container>
			<Column>
				<NumberInput
					label="Signal Threshold"
					unit=""
					parameterName="signalThreshold"
					value={parameters.signalThreshold}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Capillary Flow Rate"
					unit="s/4cm"
					parameterName="flowRate"
					value={parameters.flowRate}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<div style={{textAlign: "center", fontSize: "1.2rem", fontWeight: "bold"}}>Nitrocellulose Membrane Parameters</div>
				<NumberInput
					label="Length"
					unit="mm"
					parameterName="length"
					value={parameters.length}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Width"
					unit="mm"
					parameterName="width"
					value={parameters.width}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Thickness"
					unit="mm"
					parameterName="thickness"
					value={parameters.thickness}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<div style={{textAlign: "center", fontSize: "1.2rem", fontWeight: "bold"}}>Initial Concentrations</div>
				<NumberInput
					label="Analyte"
					unit="μM"
					parameterName="aCoef"
					value={parameters.aCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Detection Probe"
					unit="μM"
					parameterName="pCoef"
					value={parameters.pCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Capture Probe"
					unit="μM"
					parameterName="rCoef"
					value={parameters.rCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<h2 style={{textAlign: "center", margin: "32px 0"}}>Optional Parameters</h2>
		<Container>
			<Column>
				<div style={{textAlign: "center", fontSize: "1.2rem", fontWeight: "bold"}}>Capilary Flow</div>
				<NumberInput
					label="Initial Velocity"
					unit="s/4cm"
					parameterName="initVelocity"
					value={parameters.initVelocity}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Velocity Decay Rate"
					unit="1/s"
					parameterName="velocityDecay"
					value={parameters.velocityDecay}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<div style={{textAlign: "center", fontSize: "1.2rem", fontWeight: "bold"}}>Diffusion Coefficients</div>
				<NumberInput
					label="Analyte"
					unit={<>m<sup>2</sup>/s</>}
					parameterName="diffusCoef"
					value={parameters.diffusCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Probe"
					unit={<>m<sup>2</sup>/s</>}
					parameterName="probeDiffusCoef"
					value={parameters.probeDiffusCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Complex"
					unit={<>m<sup>2</sup>/s</>}
					parameterName="complexDiffusCoef"
					value={parameters.complexDiffusCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<div style={{textAlign: "center", fontSize: "1.2rem", fontWeight: "bold"}}>Reaction Rates</div>
				<NumberInput
					label="A+P Association rate"
					unit="1/s"
					parameterName="assocRate1"
					value={parameters.assocRate1}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="A+P Dissociation rate"
					unit="1/s"
					parameterName="dissocRate1"
					value={parameters.dissocRate1}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<br /><br />
				<NumberInput
					label="AP+R Association rate"
					unit="1/s"
					parameterName="assocRate2"
					value={parameters.assocRate2}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="AP+R Dissociation rate"
					unit="1/s"
					parameterName="dissocRate2"
					value={parameters.dissocRate2}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<br /><br />
				<NumberInput
					label="P+R Association rate"
					unit="1/s"
					parameterName="assocRate3"
					value={parameters.assocRate3}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="P+R Dissociation rate"
					unit="1/s"
					parameterName="dissocRate3"
					value={parameters.dissocRate3}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
					<br /><br />
				<NumberInput
					label="A+R Association rate"
					unit="1/s"
					parameterName="assocRate4"
					value={parameters.assocRate4}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="A+R Dissociation rate"
					unit="1/s"
					parameterName="dissocRate4"
					value={parameters.dissocRate4}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<h2>OR</h2>	
				<div className="fetchKoffi">
					<button onClick={forceOpenKoffiDialog}>Search the database</button>
				</div>
			</Column>
		</Container>
		<Container>
			<button disabled={openInfoPopup !== ""} onClick={submit} className="submitButton"><span>Submit</span></button>
		</Container>
	</>);
};