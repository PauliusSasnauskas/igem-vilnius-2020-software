import React from 'react';

export default function Loader(props){
    const { inline, ...other } = props;
    const theElement = <div className={"loader"} {...other}></div>;
    if (inline){
        return theElement;
    }
    return (<div className="screenCurtain">
        {theElement}
    </div>);
}