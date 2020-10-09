import React from 'react';
import LFAModelIndex from './LFAModelIndex';
import LFAModelResults from './LFAModelResults';

import './style.scss';

function App() {

    const [windowState, setWindowState] = React.useState(0);
    const [request, setRequest] = React.useState(undefined);
    const [response, setResponse] = React.useState(undefined);

    const setData = (data) => {
        setResponse(data);
        setWindowState(windowState+1);
    };

    const back = ()=>{
        setWindowState(windowState-1);
    }

    return (<>
        <div className="introContainer">
            <h1><span>on</span>Flow</h1>
            <h1><span>on</span>Flow</h1>
        </div>
        {
            /* switch(windowState) */{
                0: <LFAModelIndex setRequest={setRequest} setData={setData}/>,
                1: <LFAModelResults request={request} response={response} back={back}/>,
            }[windowState]
        }
    </>);
}

export default App;