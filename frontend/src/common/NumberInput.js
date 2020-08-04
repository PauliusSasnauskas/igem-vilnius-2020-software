import React from 'react';

export default function NumberInput(props){

    const [currentValue, setCurrentValue] = React.useState("");
    const changeCurrentValue = (e) => {
        setCurrentValue(e.target.value);
    };

    const {label, value, onChange, ...other} = props;

    return (<div className="numberInput" {...other}>
        <label>
            <span>{label}</span>
            <input type="number" value={currentValue} onChange={changeCurrentValue} />
        </label>
    </div>);
}