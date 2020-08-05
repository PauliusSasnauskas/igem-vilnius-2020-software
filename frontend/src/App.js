import React from 'react';
import ProbeSolverIndex from './ProbeSolverIndex';
import ProbeSolverSubselect from './ProbeSolverSubselect';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);
    const increaseWindowState = () => {
        setWindowState(windowState+1);
    };

    const [queryId, setQueryId] = React.useState("j48dnj291bcskf");

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
        <h1 className="title">
            ProbeSolver
        </h1>
        {
            /* switch(windowState) */{ 
                0: <ProbeSolverIndex increaseWindowState={increaseWindowState} />,
                1: <ProbeSolverSubselect queryId={queryId} />
            }[windowState]
        }
    </>);
}

export default App;