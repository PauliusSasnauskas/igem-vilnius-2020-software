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
		flowRate: "180",
		diffusCoef: "0.0000000001",
		aCoef: "0.01",
		pCoef: "0.01",
		rCoef: "0.01",
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

		let debug = false;
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
					label="Capillary Flow Rate"
					unit="s/4cm"
					parameterName="flowRate"
					value={parameters.flowRate}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Diffusion Coefficient"
					unit=""
					parameterName="diffusCoef"
					value={parameters.diffusCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
				<NumberInput
					label="Analyte concentration"
					unit="μM"
					parameterName="aCoef"
					value={parameters.aCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Detection probe concentration"
					unit="μM"
					parameterName="pCoef"
					value={parameters.pCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Capture probe concentration"
					unit="μM"
					parameterName="rCoef"
					value={parameters.rCoef}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
			</Column>
		</Container>
		<Container>
			<Column>
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