import React from 'react';
import LFAModelIndex from './LFAModelIndex';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);

    return (<>
        <div className="introContainer">
            <h1>LFA Model</h1>
            <h1>LFA Model</h1>
        </div>
        {
            /* switch(windowState) */{
                0: <LFAModelIndex/>,
            }[windowState]
        }
    </>);
}

export default App;