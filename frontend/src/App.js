import React from 'react';
import ProbeSolverIndex from './ProbeSolverIndex';
import ProbeSolverSubselect from './ProbeSolverSubselect';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);
    const setSubResultsFromIndex = (data) => {
        console.log(data); // TODO: remove
        setProcessData(data)
        setWindowState(windowState+1);
    };

    const debugProcessData = {
        "jid": "FjTYsFrzCf",
        "subSelect": [
            [
                {
                    "id": "AB680752",
                    "length": 1437,
                    "seq_eval": 4,
                    "title": "Flavobacterium branchiophilum gene for 16S rRNA, partial sequence, strain: NBRC 15030"
                },
                {
                    "id": "D14017",
                    "length": 1278,
                    "seq_eval": 3,
                    "title": "Flavobacterium branchiophilum 16S ribosomal RNA"
                },
                {
                    "id": "AB326054",
                    "length": 1071,
                    "seq_eval": 3,
                    "title": "Flavobacterium branchiophilum gyrB gene for DNA gyrase subunit B, partial cds, strain: ATCC35035"
                },
                {
                    "id": "DQ212061",
                    "length": 611,
                    "seq_eval": 3,
                    "title": "Flavobacterium branchiophilum GroEL gene, partial cds"
                },
                {
                    "id": "AY753069",
                    "length": 570,
                    "seq_eval": 2,
                    "title": "Flavobacterium branchiophilum strain ATCC 35035 16S-23S ribosomal RNA intergenic spacer, partial sequence"
                }
            ],
            []
        ],
        "request": {
            "isProbe": false,
            "strainIds": [
                "ATCC 35035",
                "CIP 109950"
            ],
            "taxIds": [
                "117743"
            ],
            "excludeIntergenic": false,
            "sequenceTypes": [
                {
                    "val": "16S rRNA",
                    "min": 100,
                    "max": 2000
                }
            ]
        }
    };

    const [processData, setProcessData] = React.useState(undefined);

    const switchLightDarkMode = (e) => {
        document.body.classList.toggle("light");
        if (document.body.classList.contains("light")){
            e.target.innerText = "Dark mode";
        }else{
            e.target.innerText = "Light mode";
        }
    }

    return (<>
        <button className="modeSwitch" onClick={switchLightDarkMode}>Light mode</button>
        <a href="docs.html" className="docsButton">Docs</a>
        <h1 className="title" onClick={()=>setSubResultsFromIndex(debugProcessData)}> {/* TODO: remove */}
            ProbeSolver
        </h1>
        {
            /* switch(windowState) */{ 
                0: <ProbeSolverIndex setData={setSubResultsFromIndex} />,
                1: <ProbeSolverSubselect processData={processData} />
            }[windowState]
        }
    </>);
}

export default App;