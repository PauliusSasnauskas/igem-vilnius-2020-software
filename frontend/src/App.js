import React from 'react';
import LFAModelIndex from './LFAModelIndex';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);

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
            LFA Model
        </h1>
        {
            /* switch(windowState) */{
                0: <LFAModelIndex/>,
            }[windowState]
        }
    </>);
}

export default App;