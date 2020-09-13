


import React from 'react';

export default function NumberInput(props){

    const initAnim = (elem, path)=>{
        let animation = bodymovin.loadAnimation({
            container: elem,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: path
        });
    };

    const { animLoc } = props;

    return (<div className="animation" data-anim={animLoc}></div>);
}