import React from 'react';

export default function Loader(props){
    const { inline, visible, ...other } = props;
    const theElement = <div className={"loader" + (visible ? " visible" : "")} {...other}></div>;
    if (inline){
        return theElement;
    }
    return (<div className={"screenCurtain" + (visible ? " visible" : "")}>
        {theElement}
    </div>);
}