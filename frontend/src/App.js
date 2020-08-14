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

    const debugProcessData = {"jid":"wEQacb3tk0","subSelect":[{"for":"5552","name":"Flavobacterium branchiophilum","sequenceList":[{"id":"AB680752","length":1437,"seq_eval":4,"title":"Flavobacterium branchiophilum gene for 16S rRNA, partial sequence, strain: NBRC 15030"},{"id":"D14017","length":1278,"seq_eval":4,"title":"Flavobacterium branchiophilum 16S ribosomal RNA"},{"id":"AB326054","length":1071,"seq_eval":3,"title":"Flavobacterium branchiophilum gyrB gene for DNA gyrase subunit B, partial cds, strain: ATCC35035"},{"id":"AY753069","length":570,"seq_eval":3,"title":"Flavobacterium branchiophilum strain ATCC 35035 16S-23S ribosomal RNA intergenic spacer, partial sequence"},{"id":"DQ212061","length":611,"seq_eval":3,"title":"Flavobacterium branchiophilum GroEL gene, partial cds"}]},{"for":"5529","name":"Flavobacterium psychrophilum","sequenceList":[{"id":"AF090991","length":1424,"seq_eval":4,"title":"Flavobacterium psychrophilum 16S ribosomal RNA gene, partial sequence"},{"id":"AY577822","length":513,"seq_eval":4,"title":"Flavobacterium psychrophilum strain ATCC 49418 16S ribosomal RNA gene, partial sequence"},{"id":"AY662493","length":1344,"seq_eval":4,"title":"Flavobacterium psychrophilum strain ATCC 49418 16S ribosomal RNA gene, partial sequence"},{"id":"JX657045","length":1259,"seq_eval":4,"title":"Flavobacterium psychrophilum strain DSM 3660 16S ribosomal RNA gene, partial sequence"},{"id":"AB681149","length":1437,"seq_eval":4,"title":"Flavobacterium psychrophilum gene for 16S rRNA, partial sequence, strain: NBRC 100250"},{"id":"D12670","length":1256,"seq_eval":4,"title":"Flavobacterium psychrophilum gene for 16S ribosomal RNA, partial sequence"},{"id":"AY034478","length":478,"seq_eval":4,"title":"Flavobacterium psychrophilum 16S ribosomal RNA gene, partial sequence"},{"id":"AY757361","length":592,"seq_eval":3,"title":"Flavobacterium psychrophilum strain ATCC 49418 16S-23S intergenic spacer, partial sequence"},{"id":"JX657167","length":573,"seq_eval":3,"title":"Flavobacterium psychrophilum strain DSM 3660 DNA-directed RNA polymerase subunit beta' (rpoC) gene, partial cds"},{"id":"FR774027","length":1149,"seq_eval":3,"title":"Flavobacterium psychrophilum partial gyrB gene, strain LMG 13179"},{"id":"AB078060","length":null,"seq_eval":2,"title":"16S rRNA gene sequence"}]}],"request":{"isProbe":false,"strainIds":["ATCC 35035","DSM 3660"],"taxIds":[117743]}};

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