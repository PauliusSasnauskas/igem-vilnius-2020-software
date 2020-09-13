import React from 'react';

export default function Loader(props){
    const {visible, ...other} = props;

    return (<div className={"loader" + (visible ? " visible" : "")} {...other}></div>);
}