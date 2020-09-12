import React from 'react';
import { Container, Column, Alert, Curtain, NumberInput} from './common';
import textVals from './common/textVals';

export default function LFAModelIndex(props){
    const [errorValue, setErrorValue] = React.useState("");
    const [isOverlaying, setIsOverlaying] = React.useState(false);
    const [popupType, setPopupType] = React.useState("");

    const [parameters, setParameters] = React.useState({
        flowRate: undefined,
        diffusCoef: undefined,
        aCoef: undefined,
        pCoef: undefined,
        rCoef: undefined,
        assocRate: undefined,
        dissocRate: undefined,
    });
    
    const setParameter = (parameter, value) => {
        setParameters({...parameters, [parameter]: value})
    };

    const submit = () => {
        if (isOverlaying) return;
        setErrorValue("");
        setPopupType("loader")
        setIsOverlaying(true);

        // send request
        const request = parameters;
        
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
        
        fetch(textVals.apiUrl + "", requestParams)
            .then((response) => response.json())
            .then((data) => {
                if (data === undefined) return;
                data.request = request;
                // setData(data);
            })
            .catch((reason) => {
                console.log(reason);
                setErrorValue(textVals.failedFetch);
                setIsOverlaying(false);
            });
    };
    const closeCurtain = () => {
        if(isOverlaying){
            setIsOverlaying(false);
            console.log("clicked")
        }
    }

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
        <Curtain visible={isOverlaying} type={popupType} setIsOverlaying={setIsOverlaying} onClick={closeCurtain}/>
        <Container>
            <Column>
                <NumberInput
                    label="Capillary Flow Rate"
                    unit="s/4cm"
                    parameterName="flowRate"
                    value={parameters.flowRate}
                    setParameter={setParameter}
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying} />
                <NumberInput
                    label="Diffusion Coefficient"
                    unit=""
                    parameterName="diffusCoef"
                    value={parameters.diffusCoef}
                    setParameter={setParameter}
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
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
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
                <NumberInput
                    label="Detection probe concentration"
                    unit="μM"
                    parameterName="pCoef"
                    value={parameters.pCoef}
                    setParameter={setParameter}
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
                <NumberInput
                    label="Test probe concentration"
                    unit="μM"
                    parameterName="rCoef"
                    value={parameters.rCoef}
                    setParameter={setParameter}
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
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
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
                <NumberInput
                    label="Dissociation rate"
                    unit="1/s"
                    parameterName="dissocRate"
                    value={parameters.dissocRate}
                    setParameter={setParameter}
                    setPopupType={setPopupType}
                    setIsOverlaying={setIsOverlaying}  />
            </Column>
        </Container>
        <Container>
            <button disabled={isOverlaying} onClick={submit} className="submitButton"><span>Submit</span></button>
        </Container>
    </>);
};