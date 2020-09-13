import React from 'react';
import { default as info } from '../assets/db';
import ReactBodymovin from 'react-bodymovin'

export default function Info(props){
    const { type, setOpenInfoPopup, ...other } = props;

    const infoText = info[type] ?? {title: "", desc: "", anim: undefined}; // default parameters

    const closePopup = () => {
        setOpenInfoPopup("");
    };

    const bodymovinOptions = {
        loop: true,
        autoplay: true,
        prerender: true,
        animationData: infoText.anim,
    };
    
    
    return (<div className="info" {...other}>
        <span onClick={closePopup}>x</span>
        <h1>{infoText.title}</h1>
        <p>{infoText.desc}</p>
        {infoText.anim !== undefined ?
            <ReactBodymovin options={bodymovinOptions} />
        : undefined}
    </div>);
}