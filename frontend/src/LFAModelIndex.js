import React from 'react';
import { Container, Column, Alert, Curtain, NumberInput} from './common';
import Loader from './common/Loader';
import Info from './common/Info';
import textVals from './common/textVals';
// import { SearchBar } from 'react-native-elements';
// import {Text, FlatList} from 'react-native';
import Autocomplete from './common/Autocomplete';
import { useEffect } from 'react';

export default function LFAModelIndex(props){
    const {setRequest, setData} = props;

    const [errorValue, setErrorValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const [openInfoPopup, setOpenInfoPopup] = React.useState("");

    const [molData, setMolData] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [molType, setMolType] = React.useState([]);

    const [parameters, setParameters] = React.useState({
        flowRate: undefined,
        diffusCoef: "1.57",
        aCoef: undefined,
        pCoef: undefined,
        rCoef: undefined,
        assocRate: undefined,
        dissocRate: undefined,
    });
    
    const setParameter = (parameter, value) => {
        setParameters({...parameters, [parameter]: value})
    };
    let data = [];

    const submit = () => {
        if (openInfoPopup !== "") return;
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
    };
    const fetchData = async () => {
        const res = await fetch('http://koffidb.org/api/interactions/?format=json&page_size=2000&filters=%28koff%21%3Dnull%29%26%28kon%21%3Dnull%29');
        const json = await res.json();
        setMolData(json);
        setMolType(json.results.map(a => a.partner_A).filter(x => x).sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        }));
      };
      useEffect(()=>{
        console.log(molData, molType)
      })

    return (<>
        {errorValue.trim().length === 0 ? undefined : (<Alert>
            {errorValue}
        </Alert>)}

        <Curtain visible={openInfoPopup !== ""}>
            <Info type={openInfoPopup} setOpenInfoPopup={setOpenInfoPopup}/>
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
                    setOpenInfoPopup={setOpenInfoPopup}  />
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
                    setOpenInfoPopup={setOpenInfoPopup}  />
                <NumberInput
                    label="Capture probe concentration"
                    unit="μM"
                    parameterName="rCoef"
                    value={parameters.rCoef}
                    setParameter={setParameter}
                    setOpenInfoPopup={setOpenInfoPopup}  />
            </Column>
        </Container>
        <Container id="nonflex">
            <Column>
                <NumberInput
                    label="Association rate"
                    unit="1/s"
                    parameterName="assocRate"
                    value={parameters.assocRate}
                    setParameter={setParameter}
                    setOpenInfoPopup={setOpenInfoPopup}  />
                <NumberInput
                    label="Dissociation rate"
                    unit="1/s"
                    parameterName="dissocRate"
                    value={parameters.dissocRate}
                    setParameter={setParameter}
                    setOpenInfoPopup={setOpenInfoPopup}  />
            </Column>
            <h2>OR</h2>
            <Column>
                <button className="submitButton" onClick={fetchData}><span>Search database</span></button>
                <Autocomplete
          suggestions={molType}
        />
            </Column>
        </Container>
        <Container>
            <button disabled={openInfoPopup !== ""} onClick={submit} className="submitButton"><span>Submit</span></button>
        </Container>
    </>);
};