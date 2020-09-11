import React from 'react';
import { Container, Column, Alert, Loader, NumberInput } from './common';
import textVals from './common/textVals';

export default function LFAModelIndex(props){
    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

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
        if (isLoading) return;
        setErrorValue("");

        setIsLoading(true);

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
                setIsLoading(false);
            });
    };

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}
        <Loader visible={isLoading} />
        <Container>
            <Column>
                <NumberInput
                    label="Capillary Flow Rate"
                    unit="s/4cm"
                    parameterName="flowRate"
                    value={parameters.flowRate}
                    setParameter={setParameter} />
                <NumberInput
                    label="Diffusion Coefficient"
                    unit=""
                    parameterName="diffusCoef"
                    value={parameters.diffusCoef}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <Container>
            <Column style={{padding: "0 16px"}}>
                <NumberInput
                    label="Analyte concentration"
                    unit="μM"
                    parameterName="aCoef"
                    value={parameters.aCoef}
                    setParameter={setParameter} />
                <NumberInput
                    label="Detection probe concentration"
                    unit="μM"
                    parameterName="pCoef"
                    value={parameters.pCoef}
                    setParameter={setParameter} />
                <NumberInput
                    label="Test probe concentration"
                    unit="μM"
                    parameterName="rCoef"
                    value={parameters.rCoef}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <Container>
            <Column style={{padding: "0 16px"}}>
                <NumberInput
                    label="Association rate"
                    unit="1/s"
                    parameterName="assocRate"
                    value={parameters.assocRate}
                    setParameter={setParameter} />
                <NumberInput
                    label="Dissociation rate"
                    unit="1/s"
                    parameterName="dissocRate"
                    value={parameters.dissocRate}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <Container>
            <button disabled={isLoading} onClick={submit} className="submitButton"><span>Submit</span></button>
        </Container>
    </>);
};