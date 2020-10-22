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
		aCoef: "0.00000001",
		pCoef: "0.00000001",
		rCoef: "0.00000001",
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
		setParameter("assocRate", rates.assocRate);
		setParameter("dissocRate", rates.dissocRate);
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
					label="Association rate"
					unit="1/s"
					parameterName="assocRate"
					value={parameters.assocRate}
					setParameter={setParameter}
					setOpenInfoPopup={setOpenInfoPopup} />
				<NumberInput
					label="Dissociation rate"
					unit="1/s"
					parameterName="dissocRate"
					value={parameters.dissocRate}
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