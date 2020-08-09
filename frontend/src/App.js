import React from 'react';
import ProbeSolverIndex from './ProbeSolverIndex';
import ProbeSolverSubselect from './ProbeSolverSubselect';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);
    const setSubResultsFromIndex = (data) => {
        setSubResults(data)
        setWindowState(windowState+1);
    };

    const [subResults, setSubResults] = React.useState(undefined);

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
        <h1 className="title" onClick={()=>console.log("uJ5s4U62Sb")}> {/* TODO: remove */}
            ProbeSolver
        </h1>
        {
            /* switch(windowState) */{ 
                0: <ProbeSolverIndex setSubResults={setSubResultsFromIndex} />,
                1: <ProbeSolverSubselect subResults={subResults} />
            }[windowState]
        }
    </>);
}

export default App;