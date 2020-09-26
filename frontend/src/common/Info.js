import React from 'react';
import { default as info } from '../assets/db';
import Lottie from 'react-lottie';

export default function Info(props){
    const { type, setOpenInfoPopup, ...other } = props;

    const infoText = info[type] ?? {title: "", desc: "", anim: undefined}; // default parameters

    const closePopup = () => {
        setOpenInfoPopup("");
    };

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: infoText.anim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
            className: "lottie"
        }
    };

    const infoRef = React.createRef();

    React.useEffect(()=>{
        if (infoRef.current.querySelector("div") == null) return;
        infoRef.current.querySelector("div").style = "";
    }, [infoRef]);
    
    return (<div className="info" {...other} ref={infoRef}>
        <span onClick={closePopup}>✕</span>
        <h1>{infoText.title}</h1>
        <p>{infoText.desc}</p>
        {infoText.anim !== undefined ?
            <Lottie options={lottieOptions} />
        : undefined}
    </div>);
}