import React from 'react';


export default function InfoButton(props){
    const {paramType, setPopupType, setIsOverlaying} = props;

    const changePopupType = () => {
        setPopupType(`${paramType} info`);
        setIsOverlaying(true);
    };
    return (<button onClick={changePopupType} className={`infoButton ${paramType}`}>
        <span>?</span>
    </button>
    );
}