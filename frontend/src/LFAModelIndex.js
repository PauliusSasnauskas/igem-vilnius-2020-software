import React from 'react';
import { Container, Number, Column, Alert, Loader, NumberInput } from './common';
import textVals from './common/textVals';

export default function LFAModelIndex(props){
    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [parameters, setParameters] = React.useState({
        capillaryFlowRate: undefined,
        diffusionCoefficient: undefined,
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
        const request = {
        };
        
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
        {isLoading ? <Loader /> : undefined}
        <Container>
            <Number number={1} />
            <Column>
                <NumberInput
                    label="Capillary Flow Rate"
                    parameterName="capillaryFlowRate"
                    value={parameters.capillaryFlowRate}
                    setParameter={setParameter} />
                <NumberInput
                    label="Diffusion Coefficient"
                    parameterName="diffusionCoefficient"
                    value={parameters.diffusionCoefficient}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <Container>
            <Number number={2} />
            <Column style={{padding: "0 16px"}}>
                <NumberInput
                    label="Analyte concentration"
                    parameterName="aCoef"
                    value={parameters.aCoef}
                    setParameter={setParameter} />
                <NumberInput
                    label="Au nanoparticle concentration"
                    parameterName="pCoef"
                    value={parameters.pCoef}
                    setParameter={setParameter} />
                <NumberInput
                    label="Probe concentration"
                    parameterName="rCoef"
                    value={parameters.rCoef}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <Container>
            <Number number={3} />
            <Column style={{padding: "0 16px"}}>
                <NumberInput
                    label="Association rate"
                    parameterName="assocRate"
                    value={parameters.assocRate}
                    setParameter={setParameter} />
                <NumberInput
                    label="Dissociation rate"
                    parameterName="dissocRate"
                    value={parameters.dissocRate}
                    setParameter={setParameter} />
            </Column>
        </Container>
        <button disabled={isLoading} onClick={submit} className="submitButton"><span>Submit</span></button>
    </>);
};